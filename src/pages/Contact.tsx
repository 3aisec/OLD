import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Footer from "@/components/landing/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Send, AlertCircle, Lock } from "lucide-react";
import trinetraLogo from "@/assets/trinetra-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const subjects = [
  "Demo Request",
  "Partnership",
  "Careers",
  "Support",
  "Other",
];

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (window.location.hash === "#fingerprint") {
      setTimeout(() => {
        document
          .getElementById("fingerprint")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 200);
    }
  }, []);
  
  const fingerprint = {
    ip: localStorage.getItem("__public_ip") || "Unknown",
    sessionId: sessionStorage.getItem("__fp_sid") || "Unknown",
    platform: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}x${screen.height}`,
    cookies: navigator.cookieEnabled ? "Enabled" : "Disabled",
    cpu: navigator.hardwareConcurrency,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      subject,
      message: formData.get("message") as string,
      sourceUrl: window.location.href,
    };

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "send-contact-email",
        { body: payload }
      );

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      navigate("/thank-you?type=contact");
    } catch (err) {
      console.error("Contact form submission error:", err);
      setError(
        "Something went wrong. Please email us directly at temp@temp.temp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={trinetraLogo} alt="Trinetra" className="h-7 w-auto" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              TRI<span className="text-primary">NETRA</span>
            </span>
          </Link>
          <Button size="sm" variant="outline" asChild>
            <Link to="/">← Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, hsl(212 100% 41% / 0.08) 0%, hsl(0 0% 98%) 100%)",
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative mx-auto px-4 lg:px-8 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Whether you need CDR analytics, dark web monitoring, or strategic guidance, our experts respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* 2-Column Layout */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Left – Form (3/5 = 60%) */}
            <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" required placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required placeholder="jane@organization.gov" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input id="organization" name="organization" placeholder="Your organization" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your requirements or how we can help…"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="glow-md text-base font-semibold px-10 h-12 w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    Your data is encrypted end-to-end and never shared
                  </p>
                </div>
              </form>
            </div>

            {/* Right – Details + Map (2/5 = 40%) */}
            
               {/* Right – Fingerprint Details */}
<div className="lg:col-span-2 space-y-8">

<div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
  <h2
    id="fingerprint"
    className="text-xl font-bold text-foreground"
  >
    Fingerprint Details
  </h2>

  <div className="space-y-4 text-sm">

    <div>
      <p className="font-medium">IP Address</p>
      <p className="text-muted-foreground break-all">
        {fingerprint.ip}
      </p>
    </div>

    <div>
      <p className="font-medium">Session ID</p>
      <p className="text-muted-foreground break-all">
        {fingerprint.sessionId}
      </p>
    </div>

    <div>
      <p className="font-medium">Platform</p>
      <p className="text-muted-foreground">
        {fingerprint.platform}
      </p>
    </div>

    <div>
      <p className="font-medium">Language</p>
      <p className="text-muted-foreground">
        {fingerprint.language}
      </p>
    </div>

    <div>
      <p className="font-medium">Timezone</p>
      <p className="text-muted-foreground">
        {fingerprint.timezone}
      </p>
    </div>

    <div>
      <p className="font-medium">Screen Resolution</p>
      <p className="text-muted-foreground">
        {fingerprint.screen}
      </p>
    </div>

    <div>
      <p className="font-medium">CPU Threads</p>
      <p className="text-muted-foreground">
        {fingerprint.cpu}
      </p>
    </div>

    <div>
      <p className="font-medium">Cookies</p>
      <p className="text-muted-foreground">
        {fingerprint.cookies}
      </p>
    </div>

  </div>
</div>

<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
  <h3 className="font-semibold mb-3">
    Fingerprint Status
  </h3>

  <p className="text-sm text-muted-foreground">
    Browser fingerprint captured successfully.
  </p>
</div>

</div>     

          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground mb-4">
            Prefer a demo first?
          </p>
          <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary text-base" asChild>
            <Link to="/demo">
              Book a Confidential Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </div>
  );
};

export default Contact;

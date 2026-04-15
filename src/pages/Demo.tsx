import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, ArrowRight, Lock, Monitor, Globe, ShieldCheck, Award, Fingerprint, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const interests = [
  "CDR/IPDR Analytics",
  "Dark Web Monitoring",
  "OSINT/Investigations",
  "Penetration Testing",
  "vCISO Services",
  "Other",
];

const benefits = [
  {
    icon: Monitor,
    title: "Live CDR/IPDR Demo",
    description: "See our analytics platform in action with representative data tailored to your operational context.",
  },
  {
    icon: Globe,
    title: "Dark Web Intelligence Walkthrough",
    description: "Explore real-time threat discovery across dark and deep web sources relevant to your sector.",
  },
  {
    icon: ArrowRight,
    title: "Customized Roadmap",
    description: "Receive a tailored deployment and integration plan aligned with your team's capabilities and objectives.",
  },
];

const testimonials = [
  {
    quote: "The CDR analytics platform reduced our investigation timelines by 60%. A game-changer for cross-border cases.",
    role: "Director of Cyber Investigations",
    org: "National Law Enforcement Agency",
  },
  {
    quote: "Their dark web monitoring capabilities gave us visibility we simply didn't have before. Critical intelligence, delivered fast.",
    role: "Head of Threat Intelligence",
    org: "Tier-1 Financial Institution",
  },
  {
    quote: "From pilot to full operational deployment in under 8 weeks. The team understood our constraints and delivered.",
    role: "CISO",
    org: "Critical Infrastructure Operator",
  },
];

const certBadges = [
  { icon: ShieldCheck, label: "ISO 27001" },
  { icon: Award, label: "SOC 2 Type II" },
  { icon: Lock, label: "NATO Cleared" },
  { icon: Globe, label: "INTERPOL Partner" },
  { icon: Fingerprint, label: "CREST Certified" },
];

const Demo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interest, setInterest] = useState("");

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
      role: formData.get("role") as string,
      phone: formData.get("phone") as string,
      interest,
      message: formData.get("message") as string,
      sourceUrl: window.location.href,
    };

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "send-demo-email",
        { body: payload }
      );

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      navigate("/thank-you?type=demo");
    } catch (err) {
      console.error("Demo form submission error:", err);
      setError(
        "Something went wrong. Please email us directly at contact@insight-weave.com."
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
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              TRINETRA
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
            Book Your <span className="text-gradient">Confidential Demo</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            See CDR/IPDR analytics + dark web intelligence in action
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" required placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required placeholder="jane@organization.gov" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization *</Label>
                    <Input id="organization" name="organization" required placeholder="Your organization" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role / Title</Label>
                    <Input id="role" name="role" placeholder="Director of Investigations" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interest">Primary Interest</Label>
                    <Select value={interest} onValueChange={setInterest}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an area" />
                      </SelectTrigger>
                      <SelectContent>
                        {interests.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message / Requirements</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your operational needs or specific capabilities you'd like to see demonstrated…"
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="glow-md text-base font-semibold px-10 h-12 w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting…" : "Book Demo"}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    Your data is encrypted and confidential
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="text-center p-6 rounded-xl border border-border bg-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
            Trusted by Investigators Worldwide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                className="rounded-xl border border-border bg-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{t.quote}"
                </p>
                <footer>
                  <p className="text-sm font-semibold text-foreground">{t.role}</p>
                  <p className="text-xs text-muted-foreground">{t.org}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {certBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-muted-foreground/60">
                <badge.icon className="h-4 w-4" />
                <span className="text-xs font-medium tracking-wide uppercase">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 lg:px-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TRINETRA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Demo;

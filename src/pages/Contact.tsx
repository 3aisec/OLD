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
import { Shield, ArrowRight, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const subjects = [
  "Demo Request",
  "Partnership",
  "Careers",
  "Support",
  "Other",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "Our team will respond within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              AEGIS<span className="text-primary">CYBER</span>
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
                    <Select name="subject">
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

                <Button
                  type="submit"
                  size="lg"
                  className="glow-md text-base font-semibold px-10 h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>

            {/* Right – Details + Map (2/5 = 40%) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-foreground">Contact Details</h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <a href="mailto:contact@insight-weave.com" className="text-sm text-primary hover:underline">
                        contact@insight-weave.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <a href="tel:+15551234567" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">Zürich, Switzerland</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Office Hours</p>
                      <p className="text-sm text-muted-foreground">Mon – Fri, 09:00 – 18:00 CET</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple Map Illustration */}
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="relative h-56 bg-secondary/50 flex items-center justify-center">
                  {/* Stylized world map with Zürich pin */}
                  <svg viewBox="0 0 400 200" className="w-full h-full p-4 text-muted-foreground/20" fill="none">
                    {/* Simplified continent outlines */}
                    <ellipse cx="200" cy="100" rx="180" ry="80" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                    <ellipse cx="200" cy="100" rx="140" ry="60" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                    <ellipse cx="200" cy="100" rx="100" ry="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                    {/* Grid lines */}
                    <line x1="20" y1="100" x2="380" y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                    <line x1="200" y1="20" x2="200" y2="180" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                    <line x1="110" y1="20" x2="110" y2="180" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
                    <line x1="290" y1="20" x2="290" y2="180" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
                    <line x1="20" y1="60" x2="380" y2="60" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
                    <line x1="20" y1="140" x2="380" y2="140" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
                    {/* Continental shapes (stylized) */}
                    <path d="M120 55 L140 50 L160 52 L170 60 L165 75 L145 80 L125 70 Z" fill="currentColor" opacity="0.15" />
                    <path d="M150 82 L165 78 L175 85 L170 100 L155 105 L145 95 Z" fill="currentColor" opacity="0.15" />
                    <path d="M220 55 L260 48 L280 55 L290 70 L270 85 L240 80 L225 68 Z" fill="currentColor" opacity="0.15" />
                    <path d="M290 60 L330 50 L360 65 L350 90 L320 95 L295 80 Z" fill="currentColor" opacity="0.15" />
                    <path d="M100 100 L130 95 L140 105 L130 130 L110 140 L95 125 Z" fill="currentColor" opacity="0.15" />
                    <path d="M310 105 L350 100 L370 120 L355 145 L325 140 L310 125 Z" fill="currentColor" opacity="0.15" />
                  </svg>
                  {/* Zürich Pin */}
                  <div className="absolute" style={{ top: "34%", left: "52%" }}>
                    <div className="relative flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 animate-pulse" />
                      <div className="mt-1.5 px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-semibold whitespace-nowrap shadow-sm">
                        Zürich
                      </div>
                    </div>
                  </div>
                </div>
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
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 lg:px-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AEGISCYBER. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Contact;

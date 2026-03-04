import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, ShieldCheck, Award, Lock, Globe, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";

const trustBadges = [
  { icon: ShieldCheck, label: "ISO 27001" },
  { icon: Award, label: "SOC 2 Type II" },
  { icon: Lock, label: "NATO Cleared" },
  { icon: Globe, label: "INTERPOL Partner" },
  { icon: Fingerprint, label: "CREST Certified" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Fifth-Generation Cyber Intelligence
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            AI-Augmented Investigations.{" "}
            <span className="text-gradient">Decisive Intelligence.</span>
          </motion.h1>

          <motion.p
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Unify CDR/IPDR analytics, dark web intelligence, and OSINT into a single
            operational platform. From signal to evidence—faster.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Button size="lg" className="glow-md text-base font-semibold px-8 h-12" asChild>
              <Link to="/demo">
                Book a Confidential Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base h-12 px-8 border-border hover:border-primary/50" asChild>
              <a href="#capabilities">
                <Download className="mr-2 h-4 w-4" />
                Download Capabilities Brief
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-muted-foreground/60"
              >
                <badge.icon className="h-4 w-4" />
                <span className="text-xs font-medium tracking-wide uppercase">
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

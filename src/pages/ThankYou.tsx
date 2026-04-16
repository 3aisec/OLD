import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Mail } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

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
            background:
              "linear-gradient(180deg, hsl(212 100% 41% / 0.08) 0%, hsl(0 0% 98%) 100%)",
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="container relative mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
          >
            <CheckCircle className="h-8 w-8 text-primary" />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Request Received ✓
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Thank you for contacting us!
          </motion.p>
        </div>
      </section>

      {/* Card */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
              <p className="text-foreground text-base leading-relaxed mb-6">
                We've received your {type === "demo" ? "demo request" : "message"} — Team
                Insight-weave will contact you soon.
              </p>

              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <p className="text-sm">
                  Need urgent help? Email{" "}
                  <a
                    href="mailto:contact@insight-weave.com"
                    className="text-primary hover:underline font-medium"
                  >
                    contact@insight-weave.com
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 lg:px-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AEGISCYBER. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;

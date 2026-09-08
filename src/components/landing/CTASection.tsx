import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Ready to Transform Your{" "}
            <span className="text-gradient">Investigative Capability?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            From signal intercept to court-ready evidence—see how our platform
            and services accelerate every stage of the investigation lifecycle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="glow-md text-base font-semibold px-8 h-12" asChild>
              <Link to="/demo">
                <ArrowRight className="mr-2 h-4 w-4" />
                Book a Confidential Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base h-12 px-8 border-border hover:border-primary/50">
              <Mail className="mr-2 h-4 w-4" />
              Contact Our Investigations Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

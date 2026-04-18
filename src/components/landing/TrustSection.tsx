import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Their CDR analytics platform cut our investigation timelines from weeks to hours. The behavioral anomaly detection alone has generated dozens of actionable leads.",
    role: "Head, Cyber Cell",
    org: "Police Special Unit",
  },
  {
    quote: "We needed a partner who understood both the technical and operational realities of counter-terrorism intelligence. They delivered on both.",
    role: "Deputy Director, Intelligence Division",
    org: "Government Security Agency",
  },
  {
    quote: "The red team engagement uncovered critical vulnerabilities in our SCADA environment that three previous vendors missed entirely.",
    role: "CISO",
    org: "Major Energy Utility",
  },
];

const certifications = [
  "CISSP", "CISA", "CISM", "CRISC", "OSCP",
  "CRTE", "ISO 27001 LA",
];

const TrustSection = () => {
  return (
    <section id="trust" className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-semibold uppercase tracking-widest text-primary mb-4 block text-xl">
            Trust
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Proven in the Field
          </h2>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {certifications.map((cert) => (
            <div
              key={cert}
              className="rounded-md border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground"
            >
              {cert}
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-border bg-card p-6 lg:p-8 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Quote className="h-5 w-5 text-primary/40 mb-4" />
              <p className="text-sm text-foreground/90 leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold">{t.role}</p>
                <p className="text-xs text-muted-foreground">{t.org}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner logos placeholder */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 rounded bg-muted/50 flex items-center justify-center"
            >
              <span className="text-[10px] text-muted-foreground/40 font-medium">
                PARTNER {i + 1}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;

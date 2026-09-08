import { motion } from "framer-motion";
import { Eye, Zap, FileCheck } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Faster Investigations",
    description:
      "Reduce analysis time by orders of magnitude. Automated CDR/IPDR correlation surfaces connections that manual review would miss.",
  },
  {
    icon: Eye,
    title: "Deeper Visibility",
    description:
      "Fuse communications data with dark web, social media, and OSINT sources into a unified operational picture.",
  },
  {
    icon: FileCheck,
    title: "Better Evidence",
    description:
      "Court-ready outputs with full audit trails. Every link, every anomaly, every timeline—documented and defensible.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Crime Has Evolved.{" "}
            <span className="text-gradient">Your Tools Should Too.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Encrypted communications, fragmented digital footprints, and cross-border
            operations make modern cyber-enabled crime nearly invisible to legacy systems.
            Investigators need a platform that thinks as fast as threats move.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className="relative group rounded-xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

import { motion } from "framer-motion";
import { Shield, Landmark, Radio, Factory } from "lucide-react";

const sectors = [
  { icon: Shield, title: "Law Enforcement & Intelligence", desc: "National and regional agencies, intelligence services, and investigative units." },
  { icon: Landmark, title: "Financial Institutions", desc: "Banks, regulators, and financial crime units combating fraud and money laundering." },
  { icon: Radio, title: "Telecom & ISPs", desc: "Operators managing lawful interception, compliance, and subscriber analytics." },
  { icon: Factory, title: "Critical Infrastructure", desc: "Energy, transport, and utilities securing operational technology environments." },
];

const SectorsSection = () => {
  return (
    <section id="sectors" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
            Sectors
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Who We Serve
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((s, i) => (
            <motion.div
              key={s.title}
              className="group rounded-xl border border-border bg-card p-6 text-center hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;

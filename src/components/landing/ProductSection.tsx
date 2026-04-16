import { motion } from "framer-motion";
import { Network, MapPin, Brain, Briefcase, Plug } from "lucide-react";
import bowAndArrow from "@/assets/bow-and-arrow-combo.svg";

const features = [
  { icon: Network, title: "Link Analysis", desc: "Visualize complex communication networks with automatic entity resolution and relationship mapping." },
  { icon: MapPin, title: "Geospatial & Temporal Views", desc: "Plot movements, communication patterns, and behavioral timelines on interactive maps." },
  { icon: Brain, title: "Behavioral Anomaly Detection", desc: "AI models flag unusual communication patterns, burner-phone indicators, and network shifts." },
  { icon: Briefcase, title: "Case Workspace", desc: "Collaborative investigation environment with role-based access, annotations, and evidence tagging." },
  { icon: Plug, title: "OSINT & Dark Web Integration", desc: "Native connectors to social media, dark web crawlers, and third-party intelligence feeds." },
];

const ProductSection = () => {
  return (
    <section id="product" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="uppercase tracking-widest text-primary mb-4 block text-5xl font-sans font-extrabold">
              GANDIV
            </span>
            <h2 className="text-3xl lg:text-4xl tracking-tight mb-6 font-medium font-serif">
              Precision Policing
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Battle-proven CDR/IPDR analytics software purpose-built for law enforcement, intelligence agencies and telecom operators. Transform raw communications metadata into actionable intelligence in minutes, not weeks.
            </p>

            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{f.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[4/3] rounded-xl border border-border bg-card overflow-hidden relative">
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <img src={bowAndArrow} alt="Product illustration" className="w-48 h-48 object-contain" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

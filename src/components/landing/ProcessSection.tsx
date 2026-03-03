import { motion } from "framer-motion";
import { MessageSquare, FlaskConical, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Confidential Briefing",
    desc: "We assess your operational requirements under NDA and propose a tailored engagement model.",
  },
  {
    icon: FlaskConical,
    step: "02",
    title: "Pilot & Assessment",
    desc: "Controlled deployment with your data, proving value against your real-world investigation scenarios.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Operational Rollout",
    desc: "Full integration, training, and ongoing support. Your team is operational from day one.",
  },
];

const ProcessSection = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
            Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            How Engagement Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-border" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="relative text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="h-12 w-12 rounded-full border-2 border-primary bg-background flex items-center justify-center mx-auto mb-6 relative z-10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary font-semibold tracking-wider">
                STEP {s.step}
              </span>
              <h3 className="text-lg font-semibold mt-2 mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

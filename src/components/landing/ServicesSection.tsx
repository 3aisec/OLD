import { motion } from "framer-motion";
import {
  Search, Globe, UserCheck, ShieldAlert, Landmark,
  Crosshair, Bug, Scan, Code,
  Users, GraduationCap, ClipboardCheck, UserCog
} from "lucide-react";

const serviceGroups = [
  {
    title: "Investigations & Intelligence",
    color: "text-primary",
    services: [
      { icon: Globe, title: "Dark Web Monitoring", desc: "Continuous discovery across Tor, I2P, and encrypted marketplaces." },
      { icon: Search, title: "OSINT & Social Media", desc: "Structured collection and analysis of open-source intelligence." },
      { icon: UserCheck, title: "Target Profiling", desc: "Behavioral indicators, digital footprints, and identity resolution." },
      { icon: ShieldAlert, title: "Cyber-Enabled Crime", desc: "End-to-end investigation support for digital criminal activity." },
      { icon: Landmark, title: "CT & Financial Crime", desc: "Counter-terrorism, extremism, and cross-border intelligence sharing." },
    ],
  },
  {
    title: "Offensive Security & Risk",
    color: "text-primary",
    services: [
      { icon: Crosshair, title: "Penetration Testing", desc: "Manual and automated testing across networks, cloud, and ICS." },
      { icon: Scan, title: "Digital Risk Assessment", desc: "Deep/dark web leaks, rogue apps, phishing, and brand risk monitoring." },
      { icon: Bug, title: "Red Teaming", desc: "Adversarial simulation including AI systems pentesting." },
      { icon: Code, title: "Application Security", desc: "Sec-arch design, DevSecOps, code review, and SDLC hardening." },
    ],
  },
  {
    title: "Strategy & Operations",
    color: "text-primary",
    services: [
      { icon: Users, title: "Security Team as a Service", desc: "Embedded expertise that scales with your operational tempo." },
      { icon: UserCog, title: "vCISO", desc: "Strategic security leadership without the full-time overhead." },
      { icon: ClipboardCheck, title: "Security Compliance", desc: "Framework alignment, gap analysis, and audit readiness." },
      { icon: GraduationCap, title: "Cybersecurity Training", desc: "Investigator training and hybrid policing capability building." },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-semibold uppercase tracking-widest text-primary mb-4 block text-xl">
            Capabilities
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Full-Spectrum Cyber Security
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {serviceGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className="rounded-xl border border-border bg-card p-6 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-6 pb-4 border-b border-border">
                {group.title}
              </h3>
              <div className="space-y-5">
                {group.services.map((s) => (
                  <div key={s.title} className="flex gap-3">
                    <s.icon className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold">{s.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

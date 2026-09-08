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
  "/certs/img1.png",
  "/certs/img2.png",
  "/certs/img3.png",
  "/certs/img4.png",
  "/certs/img5.png",
  "/certs/img6.png",
  "/certs/img7.png",
  "/certs/img8.png",
  "/certs/img9.png",
  "/certs/img10.1.png",
  "/certs/img10.2.png",
  "/certs/img11.png",
  "/certs/img12.png",
  "/certs/img13.png",
  "/certs/img14.png",
  "/certs/img15.png",
  "/certs/img16.png",
];

const partnerLogos = [
  { src: "/UPP.png", alt: "UPP" },
  { src: "/DP.png", alt: "DP" },
  { src: "/NCRB.png", alt: "NCRB" },
  { src: "/NIA.png", alt: "NIA" },
  { src: "/CBI.png", alt: "CBI" },
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
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mb-16 overflow-hidden"
>
  <div className="marquee">
    <div className="marquee-content">
      {[...certifications, ...certifications].map((cert, index) => (
        <div
          key={index}
          className="flex items-center justify-center flex-shrink-0 px-8"
        >
          <img
            src={cert}
            alt=""
            className="h-16 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  </div>
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
        <div className="mt-16 overflow-hidden">
  <motion.div
    className="flex items-center gap-8"
    animate={{
      x: ["0%", "-50%"]
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {[...partnerLogos, ...partnerLogos].map((logo, index) => (
      <div
        key={index}
        className="h-20 sm:h-24 md:h-32 w-40 sm:w-48 md:w-56 rounded bg-muted/50 flex items-center justify-center p-2 flex-shrink-0"
      >
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>
    ))}
  </motion.div>
</div>
      </div>
    </section>
  );
};

export default TrustSection;

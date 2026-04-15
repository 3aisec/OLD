import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Scale, ShieldCheck, AlertTriangle, Server, FileWarning } from "lucide-react";

const sections = [
  {
    icon: Scale,
    title: "1. Agreement to Terms",
    content:
      'By accessing or using Trinetra services, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of an organization, you represent that you have authority to bind that entity. "Services" refers to all products, platforms, and consulting engagements provided by Trinetra. These Terms are governed by and construed in accordance with the laws of the Republic of India, including the Indian Contract Act, 1872, the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023.',
  },
  {
    icon: ShieldCheck,
    title: "2. Acceptable Use Policy",
    content:
      "You agree to use our services only for lawful purposes and in accordance with applicable Indian laws, including the Information Technology Act, 2000 and the Indian Penal Code / Bharatiya Nyaya Sanhita, 2023. Prohibited activities include: unauthorized access to systems or networks (punishable under Sections 43 and 66 of the IT Act), distribution of malware or exploit code outside authorized engagements, using our intelligence products for harassment or surveillance outside legal frameworks, misrepresenting your identity or authority to access classified services, and sharing confidential reports or findings with unauthorized parties.",
  },
  {
    icon: Server,
    title: "3. Data Security Obligations",
    content:
      "Clients must maintain adequate security controls in compliance with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 when handling data, reports, or intelligence products provided by Trinetra. All penetration testing and red team engagements require signed Rules of Engagement (RoE) and authorized scope documentation. CDR/IPDR analytics outputs are classified and must be handled according to the agreed data classification framework and applicable CERT-In directives. Breach of data security obligations may result in immediate service termination.",
  },
  {
    icon: FileWarning,
    title: "4. Limitation of Liability",
    content:
      "Trinetra provides cybersecurity intelligence and advisory services on a best-effort basis. We do not guarantee the detection of all threats or vulnerabilities. Our liability is limited to the fees paid for the specific engagement in question, to the extent permitted under the Indian Contract Act, 1872 and the Consumer Protection Act, 2019. We are not liable for damages arising from client failure to implement recommended security controls.",
  },
  {
    icon: AlertTriangle,
    title: "5. Service Modifications & Termination",
    content:
      "Trinetra reserves the right to modify, suspend, or discontinue services with reasonable notice. Either party may terminate the agreement with 30 days written notice. Classified or ongoing intelligence engagements have specific termination procedures outlined in individual contracts. Upon termination, all client data is securely destroyed per our data retention policy and in compliance with the Digital Personal Data Protection Act, 2023.",
  },
  {
    icon: Scale,
    title: "6. Dispute Resolution & Jurisdiction",
    content:
      "Any disputes arising out of or in connection with these Terms shall first be attempted to be resolved through mediation. If mediation fails, disputes shall be subject to arbitration in accordance with the Arbitration and Conciliation Act, 1996, with the seat of arbitration in Bengaluru, India. The courts of Bengaluru shall have exclusive jurisdiction over any matters not subject to arbitration.",
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <Scale className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Governing the use of Trinetra intelligence and cybersecurity services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-12">
          {sections.map((s) => (
            <div key={s.title} className="space-y-3">
              <div className="flex items-center gap-3">
                <s.icon className="h-5 w-5 text-primary shrink-0" />
                <h2 className="text-xl font-semibold text-foreground">{s.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-8">{s.content}</p>
            </div>
          ))}

          <div className="border-t border-border pt-8 text-sm text-muted-foreground text-center">
            These terms are governed by the laws of the Republic of India. Last updated: April 2026.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
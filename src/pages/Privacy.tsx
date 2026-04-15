import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Shield, Lock, Globe, Mail, FileText } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "Our Commitment",
    content:
      "We protect your data like intelligence agencies protect sources. Every piece of information entrusted to AegisCyber is handled with the highest standards of confidentiality, integrity, and operational security.",
  },
  {
    icon: FileText,
    title: "Data Collection & Use",
    content:
      "We collect only the minimum data necessary to deliver our services. This includes contact information provided through our forms, technical metadata for service delivery, and anonymized usage analytics. We never sell, share, or monetize your data with third parties for advertising purposes.",
  },
  {
    icon: Lock,
    title: "CDR/IPDR Data Handling",
    content:
      "Call Detail Records (CDR) and IP Detail Records (IPDR) are among the most sensitive datasets we process. All CDR/IPDR data is encrypted at rest (AES-256) and in transit (TLS 1.3). Access is restricted on a strict need-to-know basis with full audit logging. Data is processed in isolated, air-gapped environments where required. Retention periods are defined by client contracts and applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDPA). Data destruction follows DoD 5220.22-M standards.",
  },
  {
    icon: Globe,
    title: "Indian Data Protection Compliance",
    content:
      "AegisCyber fully complies with the Digital Personal Data Protection Act, 2023 (DPDPA), the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. You have the right to access, correct, and erase your personal data. You may withdraw consent at any time by contacting us, and such withdrawal shall be as easy as granting consent. We process personal data only for lawful purposes with valid consent or other legitimate grounds as specified under the DPDPA. Cross-border data transfers are permitted only to countries and territories notified by the Central Government of India. We appoint a Consent Manager as required under the DPDPA and conduct Data Protection Impact Assessments for significant data processing activities. In the event of a data breach, we notify the Data Protection Board of India and affected Data Principals without unreasonable delay, as mandated by law.",
  },
  {
    icon: Mail,
    title: "Contact Our Grievance Officer",
    content:
      "For any privacy-related inquiries, data access or correction requests, grievances, or concerns, please contact our Grievance Officer at dpo@insight-weave.com. We acknowledge all requests within 48 hours and resolve them within 30 days as required under the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and the DPDPA.",
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            We protect your data like intelligence agencies protect sources.
          </p>
        </div>
      </section>

      {/* Content */}
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
            Last updated: April 2026
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Bug, Target, Gift, Mail, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const scopeItems = [
  "*.insight-weave.com web applications",
  "Public-facing APIs and endpoints",
  "Authentication and authorization systems",
  "Data exposure or leakage vectors",
];

const outOfScope = [
  "Social engineering or phishing attacks",
  "Physical security assessments",
  "Denial of Service (DoS/DDoS) attacks",
  "Third-party services or integrations",
];

const rewards = [
  { severity: "Critical", range: "$5,000 – $15,000", example: "RCE, auth bypass, data exfiltration" },
  { severity: "High", range: "$2,000 – $5,000", example: "Privilege escalation, SSRF, SQLi" },
  { severity: "Medium", range: "$500 – $2,000", example: "Stored XSS, IDOR, info disclosure" },
  { severity: "Low", range: "$100 – $500", example: "Reflected XSS, misconfigurations" },
];

const Disclosure = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <Bug className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Responsible Disclosure Program
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us secure the internet. We value the security research community.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-12">
          {/* Scope */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" /> In Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scopeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="text-success mt-1">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldAlert className="h-5 w-5 text-destructive" /> Out of Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {outOfScope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="text-destructive mt-1">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Rewards */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Gift className="h-6 w-6 text-primary" /> Rewards Program
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewards.map((r) => (
                <Card key={r.severity} className="border-border text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{r.severity}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <p className="text-lg font-bold text-primary">{r.range}</p>
                    <p className="text-xs text-muted-foreground">{r.example}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Report */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center space-y-3">
              <Mail className="h-8 w-8 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Report a Vulnerability</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Send your findings encrypted via PGP to our security team. Include proof of concept, impact assessment, and reproduction steps.
              </p>
              <a
                href="mailto:temp.security@temp.temp"
                className="inline-block mt-2 text-primary font-semibold hover:underline"
              >
                temp.security@temp.temp
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Disclosure;

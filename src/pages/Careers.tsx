import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Users, MapPin, Wifi, Mail, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const openings = [
  {
    title: "Threat Intelligence Analyst",
    type: "Full-time",
    location: "Bengaluru / Remote",
    description:
      "Analyze dark web activity, track threat actors, and produce actionable intelligence reports for law enforcement and enterprise clients.",
    tags: ["OSINT", "Dark Web", "Threat Hunting"],
  },
  {
    title: "CDR/IPDR Engineer",
    type: "Full-time",
    location: "Bengaluru",
    description:
      "Build and optimize large-scale CDR/IPDR analytics pipelines, design correlation algorithms, and develop real-time anomaly detection systems.",
    tags: ["Big Data", "Python", "Telecom"],
  },
  {
    title: "Red Team Operator",
    type: "Full-time / Contract",
    location: "Bengaluru / Remote",
    description:
      "Conduct advanced penetration testing, adversary simulations, and red team engagements for critical infrastructure and government clients.",
    tags: ["Pentesting", "C2 Frameworks", "Active Directory"],
  },
  {
    title: "vCISO Consultant",
    type: "Full-time",
    location: "Bengaluru / Remote",
    description:
      "Provide strategic cybersecurity leadership to clients, develop security programs, and ensure regulatory compliance across multiple frameworks.",
    tags: ["GRC", "ISO 27001", "Risk Management"],
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <Users className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Join Our Team</h1>
          <p className="text-lg text-muted-foreground">
            Intelligence-grade cybersecurity needs elite talent. We're looking for exceptional minds to help secure the digital frontier.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-6">
          <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground justify-center">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Bengaluru, India</span>
            <span className="flex items-center gap-1"><Wifi className="h-4 w-4" /> Remote-friendly</span>
          </div>

          {openings.map((job) => (
            <Card key={job.title} className="border-border hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{job.type}</Badge>
                    <span>{job.location}</span>
                  </div>
                </div>
                <CardDescription>{job.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Apply CTA */}
          <Card className="border-primary/20 bg-primary/5 mt-12">
            <CardContent className="p-8 text-center space-y-4">
              <Mail className="h-8 w-8 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Ready to Apply?</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Send your CV and a brief cover letter to our recruiting team. Include relevant certifications and any published research.
              </p>
              <Button asChild className="glow-sm">
                <a href="mailto:temp_info@trinetra-ai.com">
                  temp_info@trinetra-ai.com <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;

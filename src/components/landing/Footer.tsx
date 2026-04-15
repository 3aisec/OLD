import { Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold tracking-tight text-foreground">
              TRI<span className="text-primary">NETRA</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/disclosure" className="hover:text-foreground transition-colors">Responsible Disclosure</Link>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Trinetra. All rights reserved. Classified engagements handled under appropriate national frameworks.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

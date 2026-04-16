import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import trinetraLogo from "@/assets/trinetra-logo.png";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Product", href: "#product" },
  { label: "Services", href: "#services" },
  { label: "Demo", href: "/demo", isRoute: true },
  { label: "Careers", href: "/careers", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Responsible Disclosure", href: "/disclosure" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            TRI<span className="text-primary">NETRA</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}

        </nav>

        <div className="hidden lg:block">
          <Button size="sm" className="glow-sm font-semibold" asChild>
            <Link to="/demo">Book a Demo</Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-border">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                )
              )}
              <Button className="mt-4 glow-sm" asChild>
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

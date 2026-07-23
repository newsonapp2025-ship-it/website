import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUDIO_NEWS_ENABLED } from "@/config/features";
import NewsOnLogo from "./NewsOnLogo";
import StoreBadges from "./StoreBadges";
import { cn } from "@/lib/utils";

type FooterLink = {
  label: string;
  href: string;
  page?: boolean;
};

const footerLinkClass =
  "text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm text-left";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const footerLinks: Record<string, FooterLink[]> = {
    Overview: [
      { label: "Home", href: "/#news" },
      { label: "News", href: "/#news" },
      { label: "Contact", href: "/#contact" },
    ],
    Company: [
      { label: "About Us", href: "/about", page: true },
      { label: "Editorial Policy", href: "/editorial-policy", page: true },
    ],
    Support: [
      { label: "Contact Us", href: "/#contact" },
      { label: "Privacy Policy", href: "/privacy", page: true },
      { label: "Terms of Service", href: "/terms", page: true },
    ],
  };

  const handleHashClick = (href: string) => {
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
    const id = hash.replace("#", "");

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/${hash}`);
  };

  return (
    <footer className="relative border-t border-border/50 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <NewsOnLogo className="mb-4" imgClassName="h-12 w-auto" />
            <p className="mb-6 max-w-sm text-muted-foreground">
              {AUDIO_NEWS_ENABLED
                ? "Stay informed with audio news. Listen to the latest updates anytime, anywhere — hands-free."
                : "Stay informed with the latest headlines and stories from trusted sources — in your language."}
            </p>
            <StoreBadges size="sm" className="justify-start" />
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-semibold text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.page ? (
                      <Link to={link.href} className={cn(footerLinkClass, "inline-block")}>
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        to={link.href}
                        className={cn(footerLinkClass, "inline-block")}
                        onClick={(e) => {
                          if (link.href.includes("#")) {
                            e.preventDefault();
                            handleHashClick(link.href);
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 News On. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useLocation, useNavigate } from "react-router-dom";
import { AUDIO_NEWS_ENABLED } from "@/config/features";
import NewsOnLogo from "./NewsOnLogo";
import StoreBadges from "./StoreBadges";

type FooterLink = {
  label: string;
  href: string;
  page?: boolean;
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const footerLinks: Record<string, FooterLink[]> = {
    Overview: [
      { label: "Home", href: "#home" },
      { label: "News", href: "#news" },
      { label: "Features", href: "#features" },
      { label: "Categories", href: "#categories" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Contact", href: "#contact" },
    ],
    Company: [
      { label: "About Us", href: "/about", page: true },
      { label: "Editorial Policy", href: "/editorial-policy", page: true },
    ],
    Support: [
      { label: "Contact Us", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy", page: true },
      { label: "Terms of Service", href: "/terms", page: true },
    ],
  };

  const handleLinkClick = (link: FooterLink) => {
    if (link.page) {
      navigate(link.href);
      return;
    }

    if (location.pathname === "/") {
      const element = document.getElementById(link.href.replace("#", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + link.href);
    }
  };

  return (
    <footer className="py-16 md:py-20 border-t border-border/50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <NewsOnLogo className="mb-4" imgClassName="h-12 w-auto" />
            <p className="text-muted-foreground mb-6 max-w-sm">
              {AUDIO_NEWS_ENABLED
                ? "Stay informed with audio news. Listen to the latest updates anytime, anywhere — hands-free."
                : "Stay informed with the latest headlines and stories from trusted sources — in your language."}
            </p>
            <StoreBadges size="sm" className="justify-start" />
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleLinkClick(link)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 News On. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

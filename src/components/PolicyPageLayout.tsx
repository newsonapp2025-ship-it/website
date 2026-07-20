import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import NewsOnLogo from "@/components/NewsOnLogo";

interface PolicyPageLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: ReactNode;
}

const PolicyPageLayout = ({
  title,
  subtitle,
  lastUpdated = "June 2026",
  children,
}: PolicyPageLayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-24 md:pt-28">
      <div className="container mx-auto max-w-3xl">
        <header className="mb-10 border-b border-border pb-8 text-center">
          <div className="mb-4 flex justify-center">
            <NewsOnLogo imgClassName="h-10 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
          )}
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
          {children}
        </div>

        <footer className="mt-12 flex flex-wrap gap-4 border-t border-border pt-8 text-sm">
          <Link to="/about" className="text-primary hover:underline">
            About Us
          </Link>
          <Link to="/editorial-policy" className="text-primary hover:underline">
            Editorial Policy
          </Link>
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>
          <Link to="/#contact" className="text-primary hover:underline">
            Contact
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default PolicyPageLayout;

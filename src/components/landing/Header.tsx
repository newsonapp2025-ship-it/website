import { Newspaper, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1.5 sm:gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground transition-transform group-hover:scale-110" />
            </div>
            <span className="font-display text-lg sm:text-xl font-bold text-foreground transition-colors group-hover:text-primary">
              NewsOn
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium relative group text-sm lg:text-base"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#preview"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium relative group text-sm lg:text-base"
            >
              Preview
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#download"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium relative group text-sm lg:text-base"
            >
              Download
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 lg:px-6 text-sm lg:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
              Get the App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in slide-up-on-scroll">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#preview"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Preview
              </a>
              <a
                href="#download"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Download
              </a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full mt-2">
                Get the App
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
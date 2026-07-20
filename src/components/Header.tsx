import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import NewsOnLogo from "./NewsOnLogo";
import Footer from "./Footer";
import DownloadPopup from "./DownloadPopup";
import { MORE_NAV, PRIMARY_NAV, type NewsNavCategory } from "@/config/navCategories";
import { useNewsBrowse } from "@/context/NewsBrowseContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const GRADIENT = "linear-gradient(90deg, #C61418 0%, #010101 100%)";

function formatHeaderDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useNewsBrowse();

  const today = formatHeaderDate(new Date());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const scrollToTarget = (href: string, category?: NewsNavCategory) => {
    if (category) setActiveCategory(category);

    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + href);
        return;
      }
      const id = href.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }

    navigate(href);
  };

  const handleNavClick = (href: string, id: NewsNavCategory) => {
    setIsMenuOpen(false);
    scrollToTarget(href, id);
  };

  const navLinkClass = (id: NewsNavCategory) =>
    cn(
      "font-['Inria_Serif'] text-base font-medium transition-colors whitespace-nowrap",
      activeCategory === id
        ? "text-[#C70000]"
        : "text-foreground hover:text-[#C70000]",
    );

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md"
      >
        <div className="container mx-auto max-w-[1400px] px-4 md:px-6">
          {/* Desktop header */}
          <div className="hidden h-[72px] items-center gap-4 lg:flex lg:gap-6">
            <NewsOnLogo />

            <nav className="flex flex-1 items-center justify-center gap-5 xl:gap-8">
              {PRIMARY_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={navLinkClass(item.id)}
                >
                  {item.label}
                </button>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-['Inria_Serif'] text-base font-medium text-foreground hover:text-[#C70000]"
                  >
                    More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-[180px]">
                  {MORE_NAV.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      className="cursor-pointer"
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (item.page) navigate(item.href);
                        else scrollToTarget(item.href);
                      }}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            <div className="flex shrink-0 items-center gap-2 xl:gap-3">
              <ThemeToggle variant="header" />

              <div className="relative hidden w-[200px] xl:block 2xl:w-[260px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for any news"
                  className="h-10 w-full rounded-lg border border-border bg-secondary/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C61418]/30"
                />
              </div>

              <button
                type="button"
                className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white sm:flex"
                style={{ background: GRADIENT }}
                aria-label="Today's date"
              >
                <Calendar className="h-4 w-4" />
                <span className="whitespace-nowrap">{today}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-80" />
              </button>

              <LanguageSelector variant="icon" />
            </div>
          </div>

          {/* Mobile / tablet header */}
          <div className="flex h-16 items-center justify-between gap-2 lg:hidden">
            <NewsOnLogo />
            <div className="flex items-center gap-1">
              <ThemeToggle variant="header" />
              <LanguageSelector variant="icon" />
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="pb-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for any news"
                className="h-10 w-full rounded-lg border border-border bg-secondary/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C61418]/30"
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border bg-background lg:hidden"
            >
              <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
                {PRIMARY_NAV.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={cn(navLinkClass(item.id), "py-2.5 text-left")}
                  >
                    {item.label}
                  </button>
                ))}
                <p className="mt-2 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  More
                </p>
                {MORE_NAV.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (item.page) navigate(item.href);
                      else scrollToTarget(item.href);
                    }}
                    className="py-2 text-left text-sm text-foreground hover:text-[#C70000]"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setShowDownloadPopup(true);
                    setIsMenuOpen(false);
                  }}
                  className="mt-3 rounded-lg bg-[#C61418] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Download App
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-[116px] lg:h-[72px]" aria-hidden />

      <Outlet />

      <DownloadPopup showDownloadPopup={showDownloadPopup} setShowDownloadPopup={setShowDownloadPopup} />
      <Footer />
    </>
  );
};

export default Header;

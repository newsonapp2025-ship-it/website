import { motion } from "framer-motion";
import { Headphones, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import AudioWave from "./AudioWave";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useGetUserDataQuery } from "@/features/api/userapi";
import newslogo from "../assests/newslogo.png"
import DownloadPopup from "./DownloadPopup";

const Header = () => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);


  const { data: getdata } = useGetUserDataQuery()

  console.log(getdata, "think formate line orange")


  const navigate = useNavigate()

  const location = useLocation()

  console.log(location, "think super waiting")


  // const { hash } = useLocation();

  // useEffect(() => {
  //   if (hash) {
  //     const id = hash.replace("#", "");
  //     const element = document.getElementById(id);
  //     element?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [hash]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "News", href: "#news" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Categories", href: "#categories" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ];


  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  return (
    <>


      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <img src={newslogo} className="h-14 w-28" alt="" />

              {/* <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Headphones className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <span className="text-xl font-bold text-foreground">
                News<span className="text-gradient">On</span>
              </span> */}
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">




              {navItems.map((item) => (

                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();

                    if (location.pathname === "/") {
                      const element = document.getElementById(item.href.replace("#", ""));
                      element?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate("/" + item.href);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
                >
                  {item.label}
                </a>

              ))}
            </nav>

            {/* CTA Button */}

            <div className="hidden md:flex items-center gap-4">
              <AudioWave size="sm" barCount={4} />
              <Button onClick={() => setShowDownloadPopup(true)} variant="hero" size="default">
                Download Apps
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden py-4 border-t border-border/50"
            >
              <nav className="flex flex-col gap-4 text-center">
                {navItems.map((item) => (
                  <a
                    onClick={(e) => {

                      e.preventDefault();
                      setIsMenuOpen(false)

                      if (location.pathname === "/") {
                        const element = document.getElementById(item.href.replace("#", ""));
                        element?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        navigate("/" + item.href);
                      }
                    }}
                    key={item.label}
                    href={item.href}

                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium py-2"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}

        </div>
      </motion.header>

      <Outlet />

      <DownloadPopup showDownloadPopup={showDownloadPopup} setShowDownloadPopup={setShowDownloadPopup} />


      <Footer />
    </>
  );
};

export default Header;



import { Headphones, Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()



  const footerLinks = {
    Product: [
      { label: "Home", href: "#home" },
      { label: "Features", href: "#features" },
      { label: "Categories", href: "#categories" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Contact", href: "#contact" },

    ],
    Company: [
      { label: "About Us", href: "#about" },
    ],

    Support: [
      { label: "Contact Us", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy", page: true },
      { label: "Terms of Service", href: "/terms", page: true },
      // { label: "Terms of Service", href: "/terms", page: true },
    ],


  };

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="py-16 md:py-20 border-t border-border/50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Headphones className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                News<span className="text-gradient">On</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Stay informed with audio news. Listen to the latest updates
              anytime, anywhere — hands-free.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary/10 border border-border hover:border-primary/30 flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div className="cursor-pointer" key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link: any) => {
                  console.log(link?.page, "super duper")

                  return (
                    <li key={link}>
                      {
                        link?.page == true ?
                          <div
                            onClick={() => navigate(link?.href)}
                            className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"

                          >

                            {link?.label}
                          </div>

                          :

                          <a
                            onClick={(e) => {
                              e.preventDefault();

                              if (location.pathname === "/") {
                                const element = document.getElementById(link.href.replace("#", ""));
                                element?.scrollIntoView({ behavior: "smooth" });
                              } else {
                                navigate("/" + link.href);
                              }
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                          >
                            {link?.label}
                          </a>
                      }

                    </li>
                  )
                }
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 News On. All rights reserved.
          </p>
          {/* <p className="text-muted-foreground text-sm">
            Designed for hands-free news, anytime, anywhere.
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

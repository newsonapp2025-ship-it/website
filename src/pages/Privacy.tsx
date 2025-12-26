import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, FileText, Users, Database } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in animation on mount
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "translateY(0)";
        }
      }, 100);
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const privacySections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Collection",
      content: "We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and any other information you choose to provide."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products and services that may be of interest to you."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Sharing Your Information",
      content: "We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted service providers who assist us in operating our website and conducting our business, subject to strict confidentiality agreements."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time. You may also opt-out of certain communications from us. To exercise these rights, please contact us using the information provided below."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section with Animation */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 animate-bounce-in">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 animate-slide-up">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground mb-8 animate-slide-up-delay">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors animate-fade-in-delay"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div ref={contentRef} className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-16 animate-on-scroll">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  At NewsOn, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </div>

              {/* Privacy Sections Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {privacySections.map((section, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Information */}
              <div className="space-y-8 mb-16">
                <div className="p-8 rounded-lg border border-border bg-card animate-on-scroll">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </div>

                <div className="p-8 rounded-lg border border-border bg-card animate-on-scroll">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Email: privacy@NewsOn.com</li>
                    <li>Address: 123 News Street, Media City, MC 12345</li>
                    <li>Phone: +1 (555) 123-4567</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


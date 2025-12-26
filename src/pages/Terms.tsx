import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, AlertTriangle, CheckCircle, XCircle, FileCheck, Gavel } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Terms = () => {
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

  const termsSections = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: "By accessing and using NewsFlow, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
      type: "info"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of the materials on NewsFlow's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
      type: "success"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Restrictions",
      content: "You may not modify or copy the materials, use the materials for any commercial purpose, attempt to decompile or reverse engineer any software, or remove any copyright or other proprietary notations.",
      type: "warning"
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "Disclaimer",
      content: "The materials on NewsFlow's website are provided on an 'as is' basis. NewsFlow makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.",
      type: "error"
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Limitations",
      content: "In no event shall NewsFlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NewsFlow's website.",
      type: "info"
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which NewsFlow operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
      type: "info"
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-500 bg-green-500/10 group-hover:bg-green-500/20";
      case "warning":
        return "text-yellow-500 bg-yellow-500/10 group-hover:bg-yellow-500/20";
      case "error":
        return "text-red-500 bg-red-500/10 group-hover:bg-red-500/20";
      default:
        return "text-primary bg-primary/10 group-hover:bg-primary/20";
    }
  };

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
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 animate-slide-up">
                Terms and Conditions
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
                  Welcome to NewsFlow. These Terms and Conditions ("Terms") govern your access to and use of our website and services. By accessing or using NewsFlow, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the service.
                </p>
              </div>

              {/* Terms Sections Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {termsSections.map((section, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(section.type)} group-hover:scale-110 transition-all duration-300`}>
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
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">Intellectual Property Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The service and its original content, features, and functionality are and will remain the exclusive property of NewsFlow and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                  </p>
                </div>

                <div className="p-8 rounded-lg border border-border bg-card animate-on-scroll">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                </div>

                <div className="p-8 rounded-lg border border-border bg-card animate-on-scroll">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">Termination</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                </div>

                <div className="p-8 rounded-lg border border-border bg-card animate-on-scroll">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </div>

                <div className="p-8 rounded-lg border border-border bg-card animate-on-scroll">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Email: legal@newsflow.com</li>
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

export default Terms;


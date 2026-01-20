import { motion } from "framer-motion";
import { Download, Settings, Headphones, Play } from "lucide-react";
import { useState } from "react";
import DownloadPopup from "./DownloadPopup";

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Download the App",
    description: "Get News On from App Store or Google Play Store for free.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Choose Your Interests",
    description: "Select the news categories that matter most to you.",
  },
  {
    icon: Headphones,
    step: "03",
    title: "Plug In & Listen",
    description: "Put on your headphones and enjoy hands-free news updates.",
  },
  {
    icon: Play,
    step: "04",
    title: "Stay Informed",
    description: "Get daily updates and never miss important news again.",
  },
];



const HowItWorksSection = () => {



  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get Started in{" "}
            <span className="text-gradient">4 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start listening to news in minutes. No complicated setup required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >

                <div className="text-center">
                  {/* Step Number & Icon */}
                  <div className="relative inline-block mb-6">
                    <div
                      onClick={() => index == 0 && setShowDownloadPopup(true)} className={`${index == 0 ? "cursor-pointer" : ""} w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center relative z-10 group hover:border-primary/50 transition-colors duration-300`}>
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-glow">
                      {/* {step.step} */}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <DownloadPopup showDownloadPopup={showDownloadPopup} setShowDownloadPopup={setShowDownloadPopup} />
    </section >
  );
};

export default HowItWorksSection;

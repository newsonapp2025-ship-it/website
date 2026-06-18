import { motion } from "framer-motion";
import { Download, User } from "lucide-react";
import { useState } from "react";
import DownloadPopup from "./DownloadPopup";
import { AUDIO_NEWS_ENABLED } from "@/config/features";
// import AudioWave from "./AudioWave";

const CTASection = () => {



  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  return (
    <section
      className="relative py-24 overflow-hidden bg-background"
    >

      <div className="absolute inset-0 bg-gradient-subtle" />
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-40" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-glow opacity-30 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* AUDIO_NEWS_ENABLED: <AudioWave size="lg" barCount={9} /> */}

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Ready to Transform How You{" "}
            <span className="text-gradient">Consume News?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {AUDIO_NEWS_ENABLED
              ? "Join over 1 million users who have switched to audio news. Download News On today and never miss a story."
              : "Join thousands of readers who stay informed with News On. Download the app today and never miss a story."}
          </p>

          <div className="flex justify-center gap-4 mb-12">
            {/* Play Store */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer z-50 justify-center px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
                className="h-12"
              />
            </a>

            {/* App Store */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center z-50 justify-center px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-12"
              />
            </a>
          </div>

          {/* Download Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" className="group">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </Button>
            <Button variant="hero" size="xl" className="group">
              <Smartphone className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="font-bold">Google Play</div>
              </div>
            </Button>
          </div> */}

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center"
                  >
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <span className="text-sm">1M+ Happy Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <span className="text-sm">4.8 Rating</span>
            </div>
            <div onClick={() => setShowDownloadPopup(true)} className="flex items-center gap-2 cursor-pointer">
              <Download className="w-4 h-4" />
              <span className="text-sm">Free Download</span>
            </div>
          </motion.div>
        </motion.div>
      </div>


      <DownloadPopup showDownloadPopup={showDownloadPopup} setShowDownloadPopup={setShowDownloadPopup} />
    </section>
  );
};

export default CTASection;

import { motion } from "framer-motion";
import { Play, Download, Headphones, Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioWave from "./AudioWave";
import { useEffect, useRef, useState } from "react";
import newsonaudio from "./newsonaudio.mp3";
import SliderVideo from "./SliderVideo";
import StoreBadges from "./StoreBadges";

const HeroSection = () => {


  const [showDownloadPopup, setShowDownloadPopup] = useState(false);


  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration
    ? (currentTime / duration) * 100
    : 0;

  const handleTimeUpdate = () => {
    setCurrentTime(Math.floor(audioRef.current.currentTime));
  };


  const handleLoadedMetadata = () => {
    setDuration(Math.floor(audioRef.current.duration));
  };

  console.log(currentTime, duration, "currenttime");



  const toggleAudio = () => {
    console.log(audioRef?.current, "audioref");
    audioRef.current.currentTime = 20;
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };


  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-glow blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />


      <audio
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        ref={audioRef}
        src={newsonaudio} />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[10%] hidden lg:block"
      >
        <div className="w-16 h-16 rounded-2xl bg-secondary/80 backdrop-blur-sm flex items-center justify-center border border-border/50">
          <Volume2 className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 right-[10%] hidden lg:block"
      >
        <div className="w-14 h-14 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/30">
          <Headphones className="w-6 h-6 text-accent" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 mb-6"
            >
              <AudioWave size="sm" barCount={3} />
              <span className="text-sm text-muted-foreground">Audio-First News Experience</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6">
              Listen to the News,{" "}
              <span className="text-gradient">Anywhere</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Stay informed hands-free with real-time audio news. Perfect for traveling,
              working, or relaxing — News On keeps you updated without reading.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="hero"
                size="xl"
                className="group"
                onClick={() => setShowDownloadPopup(true)}
              >
                <Download className="w-5 h-5" />
                Download Now
              </Button>

              <Button onClick={() => toggleAudio()} variant="hero-outline" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
            >
              {[
                { value: "1M+", label: "Downloads" },
                { value: "50+", label: "News Sources" },
                { value: "4.8", label: "App Rating" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <SliderVideo />
        </div>
      </div>

      {showDownloadPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-2xl p-6 w-[90%] max-w-md border border-border shadow-xl relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDownloadPopup(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-center mb-2">
              Download NewsOn App
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Choose your platform to continue
            </p>

            <StoreBadges size="sm" className="flex-col sm:flex-row" />
          </motion.div>
        </div>
      )}

    </section>
  );
};

export default HeroSection;

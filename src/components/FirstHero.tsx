import { motion } from "framer-motion";
import { Play, Download, Headphones, Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioWave from "./AudioWave";
import { useEffect, useRef, useState } from "react";
import { useGetNewsbyIdQuery, useOneNewsQuery } from "@/features/api/userapi";
import newsonaudio from "./newsonaudio.mp3";
import DownloadPopup from "./DownloadPopup";
import StoreBadges from "./StoreBadges";
const FirstHero = () => {

    const { data: getData } = useOneNewsQuery()

    console.log(getData, "change darak super")

    // console.log(oneNewsdata, "change daraksuper")

    // console.log(oneNewsdata, "think super large like waste")

    const [showDownloadPopup, setShowDownloadPopup] = useState(false);



    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // const { data: getData } = useGetNewsbyIdQuery("691c40dc9f4d6c8006c3bf02");
    const news = getData?.data;

    console.log(news, "change formate ui large")



    const [playingId, setPlayingId] = useState(null);
    const [audioStep, setAudioStep] = useState("title"); // "title" | "content"

    // Calculate progress for the bar
    const progress = duration ? (currentTime / duration) * 100 : 0;

    // Play / Pause toggle
    const toggleAudio = () => {
        if (!news) return;

        // Same news clicked → toggle pause/play
        if (playingId === news._id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
            return;
        }

        // New news clicked → start title audio
        setPlayingId(news._id);
        setAudioStep("title");
        audioRef.current.src = news.title_audio_url;
        audioRef.current.play();
        setIsPlaying(true);
    };

    // Handle audio end → switch title → content or stop
    const handleAudioEnd = (news) => {
        if (!news) return;

        if (audioStep === "title" && news.content_audio_url) {
            setAudioStep("content");
            audioRef.current.src = news.content_audio_url;
            audioRef.current.play();
        } else {
            setPlayingId(null);
            setAudioStep("title");
            setIsPlaying(false);
        }
    };

    // Update currentTime for progress bar
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const setMeta = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", setMeta);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", setMeta);
        };
    }, [playingId]);

    return (
        <>
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

                <DownloadPopup showDownloadPopup={showDownloadPopup} setShowDownloadPopup={setShowDownloadPopup} />

                {/* {showDownloadPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-background rounded-2xl p-6 w-[90%] max-w-md border border-border shadow-xl relative"
                        >
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

                            <StoreBadges size="sm" />

                        </motion.div>
                    </div>
                )} */}
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-radial opacity-50" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-glow blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />

                {/* Single audio element */}
                <audio
                    ref={audioRef}
                    onEnded={() => handleAudioEnd(news)}
                />

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
                                    onClick={() => setShowDownloadPopup(true)}
                                    variant="hero" size="xl" className="group">
                                    <Download className="w-5 h-5" />
                                    Download Now
                                </Button>
                                <Button onClick={toggleAudio} variant="hero-outline" size="xl">
                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    Listen Demo
                                </Button>
                            </div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
                            >
                                {[{ value: "1M+", label: "Downloads" }, { value: "50+", label: "News Sources" }, { value: "4.8", label: "App Rating" }].map((stat, i) => (
                                    <div key={i} className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Phone Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative flex justify-center"
                        >
                            <div className="relative">
                                <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] bg-gradient-to-b from-secondary to-card rounded-[3rem] p-3 shadow-2xl shadow-card border border-border/50">
                                    <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                                        <div className="p-6 h-full flex flex-col">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-xs text-muted-foreground">9:41</span>
                                                <div className="flex gap-1">
                                                    <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                                                    <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                                                </div>
                                            </div>

                                            {/* Now Playing */}
                                            <div className="flex-1 flex flex-col justify-center items-center">
                                                <motion.div
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-primary mb-6 flex items-center justify-center shadow-glow"
                                                >
                                                    <Headphones className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
                                                </motion.div>

                                                <h3 className="text-lg font-bold text-foreground mb-1">
                                                    {news?.category?.[0]?.categoryName ?? "Breaking News"}
                                                </h3>
                                                {/* <p className="text-sm text-muted-foreground mb-4">{news?.description?.slice(0, 50)}...</p> */}

                                                <AudioWave size="lg" barCount={7} className="mb-6 h-10" />

                                                {/* Progress Bar */}
                                                <div className="w-full max-w-[200px]">
                                                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                            transition={{ duration: 0.2 }}
                                                            className="h-full bg-gradient-primary rounded-full"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                                        <span>{Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}</span>
                                                        <span>{Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex justify-center items-center gap-6 py-4">
                                                <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                                    <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-foreground rotate-180 mr-0.5" />
                                                </button>

                                                <button onClick={toggleAudio} className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                                                    {isPlaying ? <Pause className="w-6 h-6 text-black" /> : <Play className="w-6 h-6 text-black" />}
                                                </button>

                                                <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-foreground ml-0.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl -z-10 rounded-full" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


        </>

    );
};

export default FirstHero;

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import girlvideo from "../../src/assests/girlvideo.mp4";
import "swiper/css";

function SliderVideo() {
    const videoRefs = useRef([]);
    const swiperRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSlideChange = () => {
        setIsPlaying(false);
        videoRefs.current.forEach((video) => {
            if (!video) return;
            video.pause();
            video.currentTime = 0;
        });
    };

    const toggleVideo = () => {
        const index = swiperRef.current?.realIndex;
        const video = videoRefs.current[index];

        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
        >
            {/* Phone Frame */}
            <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[540px] bg-gradient-to-b from-secondary to-card rounded-[3rem] p-3 shadow-2xl border border-border/50">

                {/* Screen */}
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">

                    {/* Swiper */}
                    <Swiper
                        loop
                        slidesPerView={1}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={handleSlideChange}
                        className="w-full h-full"
                    >
                        {[girlvideo, girlvideo].map((src, index) => (
                            <SwiperSlide key={index}>
                                <video
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    src={src}

                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Center Play / Pause */}
                    <button
                        onClick={toggleVideo}
                        className="absolute hover:opacity-100 opacity-0 inset-0 flex items-center justify-center z-10"
                    >
                        <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-white" />
                            ) : (
                                <Play className="w-8 h-8 text-white ml-1" />
                            )}
                        </div>
                    </button>

                    {/* Bottom Controls */}
                    <div className="absolute  bottom-4 left-0 right-0 flex justify-between px-4 z-20">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl -z-10 rounded-full" />
            </div>
        </motion.div>
    );
}

export default SliderVideo;

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Newspaper } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { useGetNewsbyIdQuery } from "@/features/api/userapi";

function FiveNewsPage() {
    const { id } = useParams();
    const { data: getData } = useGetNewsbyIdQuery(id);

    console.log(getData, "think super view")

    const { pathname } = useLocation();

    const audioRef = useRef(null);

    const [playingId, setPlayingId] = useState(null);
    const [audioStep, setAudioStep] = useState("title"); // "title" | "content"

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    // 🔁 Handle audio end → switch from title → content
    const handleAudioEnd = (news) => {
        if (audioStep === "title") {
            setAudioStep("content");
            audioRef.current.src = news.content_audio_url;
            audioRef.current.play();
        } else {
            setPlayingId(null);
            setAudioStep("title");
        }
    };

    const togglePlay = (news) => {
        // If clicking same news
        if (playingId === news._id) {
            audioRef.current.pause();
            setPlayingId(null);
            setAudioStep("title");
            return;
        }

        // If new news clicked
        setPlayingId(news._id);
        setAudioStep("title");

        audioRef.current.src = news.title_audio_url;
        audioRef.current.play();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-[#1a0b1f] px-4 py-28">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Audio News
                    </h1>
                    <p className="text-gray-400">
                        Title audio plays first, followed by full content.
                    </p>
                </div>

                {/* NEWS GRID */}

                {getData?.data?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                            <Newspaper className="w-8 h-8 text-muted-foreground" />
                        </div>

                        <h3 className="text-lg font-semibold">
                            No News Available
                        </h3>

                        <p className="text-sm text-muted-foreground mt-1">
                            We couldn’t find any news at the moment. Please check back later.
                        </p>
                    </div>
                ) : (

                    <div className="grid gap-8 md:grid-cols-2"> {
                        getData?.data?.map((news) => (
                            <div
                                key={news._id}
                                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                            >
                                <img
                                    src={news.image_url}
                                    alt={news.title}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {news.title}
                                    </h3>

                                    <p className="text-gray-400 mb-6  line-clamp-2">
                                        {news.description}
                                    </p>

                                    <button
                                        onClick={() => togglePlay(news)}
                                        className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-black font-medium"
                                    >
                                        {playingId === news._id ? (
                                            <>
                                                <Pause className="w-5 h-5" />
                                                Pause Audio
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-5 h-5" />
                                                Play Audio
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )

                }


                {/* 🎧 SINGLE AUDIO ELEMENT */}
                <audio
                    ref={audioRef}
                    onEnded={() => {
                        const news = getData?.data?.find(n => n._id === playingId);
                        if (news) handleAudioEnd(news);
                    }}
                />
            </div>
        </div>
    );
}

export default FiveNewsPage;

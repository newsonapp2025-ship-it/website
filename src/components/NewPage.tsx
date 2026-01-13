import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useLocation } from "react-router-dom";

function FiveNewsPage() {
    const [playingId, setPlayingId] = useState(null);


    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // change to "auto" if you want instant
        });
    }, [pathname]);

    const togglePlay = (id) => {
        setPlayingId(playingId === id ? null : id);
    };


    const newsData = [
        {
            id: 1,
            title: "Breaking: Global Markets Rally",
            description:
                "Stock markets around the world saw a major rally today following positive economic signals.",
            image:
                "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
            audioUrl: "", // API audio URL later
        },
        {
            id: 2,
            title: "Tech: AI Changing the World",
            description:
                "Artificial Intelligence continues to reshape industries from healthcare to finance.",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475",
            audioUrl: "",
        },
        {
            id: 2,
            title: "Tech: AI Changing the World",
            description:
                "Artificial Intelligence continues to reshape industries from healthcare to finance.",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475",
            audioUrl: "",
        },
        {
            id: 2,
            title: "Tech: AI Changing the World",
            description:
                "Artificial Intelligence continues to reshape industries from healthcare to finance.",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475",
            audioUrl: "",
        },
        {
            id: 2,
            title: "Tech: AI Changing the World",
            description:
                "Artificial Intelligence continues to reshape industries from healthcare to finance.",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475",
            audioUrl: "",
        },
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-[#1a0b1f] px-4 py-28">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-orange-400 text-sm">
                        Audio News Highlights
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Latest News,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                            Simplified for You
                        </span>
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Listen to short, curated news updates designed for multitasking.
                    </p>
                </div>

                {/* News Cards */}
                <div className="grid gap-8 md:grid-cols-2">
                    {newsData.map((news) => (
                        <div
                            key={news.id}
                            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md hover:scale-[1.02] transition-transform"
                        >
                            {/* Image */}
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-48 object-cover"
                            />

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {news.title}
                                </h3>

                                <p className="text-gray-400 mb-6">
                                    {news.description}
                                </p>

                                {/* Play / Pause */}
                                <button
                                    onClick={() => togglePlay(news.id)}
                                    className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-black font-medium hover:opacity-90"
                                >
                                    {playingId === news.id ? (
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

                                {/* 🔊 Audio tag (API ready) */}
                                {/* 
                {playingId === news.id && (
                  <audio src={news.audioUrl} autoPlay />
                )} 
                */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FiveNewsPage;

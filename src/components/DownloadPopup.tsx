import React from "react";
import { motion } from "framer-motion";

function DownloadPopup({ showDownloadPopup, setShowDownloadPopup }) {
    return (
        <>
            {showDownloadPopup && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={() => setShowDownloadPopup(false)} // 👈 outside click
                >

                    {/* Modal Box */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // 👈 prevent close on inside click
                        className="bg-background rounded-2xl p-6 w-[90%] max-w-md border border-border shadow-xl relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowDownloadPopup(false)}
                            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground cursor-pointer z-50"
                        >
                            ✕
                        </button>

                        <div className="absolute inset-0 bg-gradient-radial opacity-50 z-10" />
                        <h3 className="text-xl font-bold text-center text-gradient mb-2">
                            Download NewsOn App
                        </h3>
                        <p className="text-sm text-white text-center mb-6">
                            Choose your platform to continue
                        </p>

                        <div className="flex justify-center gap-4">
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
                                    className="h-10"
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
                                    className="h-10"
                                />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}

export default DownloadPopup;

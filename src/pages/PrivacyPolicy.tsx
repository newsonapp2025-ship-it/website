import { usePrivacyDataQuery } from "@/features/api/userapi";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const privacyPolicyData = [
    {
        id: 1,
        title: "About NewsOn",
        content:
            "NewsOn is an AI-powered, audio-first news application that automatically curates, summarizes, and delivers news content for listening and reading. We are committed to protecting your privacy and handling your data responsibly.",
    },
    {
        id: 2,
        title: "Information We Collect",
        content:
            "We may collect information such as your name, email address, device details, usage data, IP address, and content preferences to improve your experience.",
    },
    {
        id: 3,
        title: "How We Use Your Information",
        content:
            "Your information is used to personalize news content, improve AI-generated summaries, enhance audio playback, analyze performance, and ensure platform security.",
    },
    {
        id: 4,
        title: "AI & Automated Content",
        content:
            "NewsOn uses Artificial Intelligence to automatically gather news from trusted sources, generate summaries, and recommend content. These processes are content-based only and do not involve sensitive profiling.",
    },
    {
        id: 5,
        title: "Cookies & Tracking",
        content:
            "We may use cookies or similar technologies to remember your preferences, analyze traffic, and improve application performance. You can disable cookies through your browser settings.",
    },
    {
        id: 6,
        title: "Third-Party Services",
        content:
            "We may use trusted third-party services for analytics, hosting, and audio streaming. These services follow strict data protection and confidentiality standards.",
    },
    {
        id: 7,
        title: "Data Security",
        content:
            "We implement reasonable technical and organizational measures such as encrypted connections and secure servers to protect your information.",
    },
    {
        id: 8,
        title: "Data Retention",
        content:
            "Your data is retained only as long as necessary to provide our services, comply with legal requirements, and improve the application.",
    },
    {
        id: 9,
        title: "Children’s Privacy",
        content:
            "NewsOn is not intended for children under the age of 13. We do not knowingly collect personal information from children.",
    },
    {
        id: 10,
        title: "Policy Updates",
        content:
            "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    },
    {
        id: 11,
        title: "Contact Us",
        content:
            "If you have any questions or concerns regarding this Privacy Policy, you can contact us at support@newson.app.",
    },
];


function PrivacyPolicyPage() {

    const { data: getdata } = usePrivacyDataQuery()


    console.log(getdata?.data, "formate ranger")



    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // change to "auto" if you want instant
        });
    }, [pathname]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-[#1a0b1f] px-4 py-24">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-orange-400 text-sm">
                        Legal
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Privacy Policy
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Your privacy matters to us. Learn how NewsOn collects, uses, and
                        protects your information.
                    </p>
                </div>

                {/* Policy Content */}
                <div className="space-y-8">
                    {privacyPolicyData.map((item) => (
                        <div
                            key={item.id}
                            className="   backdrop-blur-md"
                        >
                            <h2 className="text-xl font-semibold text-white mb-3">
                                {item.title}
                            </h2>

                            <p className="text-gray-400 leading-relaxed">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                {/* <div className="text-center text-gray-500 text-sm mt-16">
                    © {new Date().getFullYear()} NewsOn. All rights reserved.
                </div> */}
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;

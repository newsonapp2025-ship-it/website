



// import { useTermsDataQuery } from '@/features/api/userapi';
import { usePrivacyDataQuery } from '@/features/api/userapi';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export const PrivacyPolicyPagesData = [
    {
        id: 1,
        title: "Acceptance of Terms",
        content:
            "By accessing or using the NewsOn application, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the application.",
    },
    {
        id: 2,
        title: "About NewsOn",
        content:
            "NewsOn is an AI-powered, audio-first news application that automatically curates, summarizes, and delivers news content for informational purposes only.",
    },
    {
        id: 3,
        title: "Use of the Application",
        content:
            "You agree to use NewsOn only for lawful purposes and in a way that does not violate any applicable laws or regulations.",
    },
    {
        id: 4,
        title: "AI-Generated Content",
        content:
            "NewsOn uses Artificial Intelligence to generate summaries and audio content. While we strive for accuracy, we do not guarantee that all content is complete, accurate, or up to date.",
    },
    {
        id: 5,
        title: "No Professional Advice",
        content:
            "The content provided by NewsOn is for general informational purposes only and should not be considered legal, financial, medical, or professional advice.",
    },
    {
        id: 6,
        title: "Intellectual Property",
        content:
            "All content, trademarks, logos, and design elements within NewsOn are the intellectual property of NewsOn or its licensors and may not be copied, modified, or redistributed without permission.",
    },
    {
        id: 7,
        title: "Third-Party Links",
        content:
            "NewsOn may include links to third-party websites or services. We are not responsible for the content, policies, or practices of these third parties.",
    },
    {
        id: 8,
        title: "User Responsibilities",
        content:
            "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    },
    {
        id: 9,
        title: "Limitation of Liability",
        content:
            "NewsOn shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the application.",
    },
    {
        id: 10,
        title: "Termination",
        content:
            "We reserve the right to suspend or terminate access to NewsOn at any time without notice if these Terms are violated.",
    },
    {
        id: 11,
        title: "Changes to Terms",
        content:
            "We may update these Terms and Conditions from time to time. Continued use of the application after changes indicates acceptance of the updated terms.",
    },
    {
        id: 12,
        title: "Governing Law",
        content:
            "These Terms and Conditions shall be governed by and interpreted in accordance with applicable laws.",
    },
    {
        id: 13,
        title: "Contact Information",
        content:
            "If you have any questions regarding these Terms and Conditions, please contact us at support@newson.app.",
    },
];


function PrivacyPolicyPage() {

    const { data: getdata } = usePrivacyDataQuery()


    // console.log(getdata?.data?.privacyPolicy, "formate ranger")


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

            <div className="text-center mb-16">


                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Privacy Policy
                </h1>

            </div>


            <div
                className="text-white!important  leading-relaxed space-y-2 max-w-4xl  mx-auto"
                dangerouslySetInnerHTML={{ __html: getdata?.data?.privacyPolicy || "" }}
            />

            <div className="max-w-4xl mx-auto">

                {/* Header */}


                {/* Footer */}
                {/* <div className="text-center text-gray-500 text-sm mt-16">
                    © {new Date().getFullYear()} NewsOn. All rights reserved.
                </div> */}
            </div>
        </div>
    )
}

export default PrivacyPolicyPage
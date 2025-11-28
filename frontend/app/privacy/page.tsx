import React from "react";

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose max-w-none">
                <p className="mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="mb-4">
                    At SchoolConnect, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                    We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, phone number, and school-related data.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                    We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
                <p className="mb-4">
                    We implement appropriate technical and organizational measures to protect the security of your personal information.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us at privacy@schoolconnect.com.
                </p>
            </div>
        </div>
    );
}

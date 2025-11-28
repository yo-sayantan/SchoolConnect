import React from "react";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="prose max-w-none">
                <p className="mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="mb-4">
                    Please read these Terms of Service carefully before using SchoolConnect.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By accessing or using SchoolConnect, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
                <p className="mb-4">
                    Permission is granted to temporarily access the materials (information or software) on SchoolConnect for personal, non-commercial transitory viewing only.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
                <p className="mb-4">
                    You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Termination</h2>
                <p className="mb-4">
                    We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
            </div>
        </div>
    );
}

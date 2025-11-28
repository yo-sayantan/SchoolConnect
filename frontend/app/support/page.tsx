import React from "react";

export default function SupportPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Support Center</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                    <ul className="space-y-3">
                        <li>
                            <details className="group">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span>How do I reset my password?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                    You can reset your password by clicking on the "Forgot Password" link on the login page.
                                </p>
                            </details>
                        </li>
                        <li>
                            <details className="group">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span>How do I contact a teacher?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                    Navigate to the "Communication" tab in your dashboard to send messages to teachers.
                                </p>
                            </details>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
                    <p className="text-gray-600 mb-4">
                        Need further assistance? Our support team is here to help.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="button" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

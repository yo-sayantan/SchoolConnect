export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 mt-auto sticky bottom-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Company Branding */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
                            H
                        </div>
                        <div>
                            <p className="font-bold text-lg">heXagonTech</p>
                            <p className="text-xs opacity-75">Powering Education Technology</p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-sm opacity-90">
                            © {new Date().getFullYear()} heXagonTech. All rights reserved.
                        </p>
                        <p className="text-xs opacity-75 mt-1">
                            SchoolConnect V3.0 - Built with ❤️ for better education
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap justify-center gap-6 text-sm opacity-75">
                    <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                    <a href="/support" className="hover:text-blue-400 transition-colors">Support</a>
                    <a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

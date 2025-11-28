export default function Footer() {
    return (
        <footer className="bg-gray-900/90 backdrop-blur-md text-white py-3 mt-auto sticky bottom-0 z-50 border-t border-white/10">
            <div className="w-full px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Company Branding */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg">
                        H
                    </div>
                    <div className="leading-tight">
                        <p className="font-bold text-sm">heXagonTech</p>
                        <p className="text-[10px] opacity-60">Powering Education</p>
                    </div>
                    <span className="hidden md:inline text-gray-600 mx-2">|</span>
                    <p className="text-xs opacity-50 hidden md:block">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 text-xs font-medium opacity-80">
                    <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</a>
                    <a href="/terms" className="hover:text-blue-400 transition-colors">Terms</a>
                    <a href="/support" className="hover:text-blue-400 transition-colors">Support</a>
                    <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}

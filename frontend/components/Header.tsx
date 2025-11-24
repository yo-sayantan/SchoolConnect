export default function Header() {
    return (
        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* School Logo & Name */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                            🎓
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Greenwood International School</h1>
                            <p className="text-sm opacity-90 flex items-center gap-2">
                                <span>📍</span>
                                <span>123 Education Lane, Silicon Valley, CA 94025</span>
                            </p>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span>📞</span>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✉️</span>
                            <span>info@greenwood.edu</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, X } from "lucide-react";

interface Favorite {
    id: string;
    name: string;
    path: string;
    emoji: string;
    color: string;
}

export default function Favorites() {
    const router = useRouter();
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load favorites from localStorage
        const saved = localStorage.getItem("favorites");
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    const removeFavorite = (id: string) => {
        const updated = favorites.filter(f => f.id !== id);
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    if (favorites.length === 0) return null;

    return (
        <>
            {/* Favorites Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-20 right-6 z-40 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            >
                <Star className="w-6 h-6 fill-current" />
            </button>

            {/* Favorites Panel */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div className="fixed top-20 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                My Favorites
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {favorites.map((fav) => (
                                <div
                                    key={fav.id}
                                    className={`group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-${fav.color}-50 to-${fav.color}-100 dark:from-${fav.color}-900/20 dark:to-${fav.color}-800/20 hover:shadow-md transition-all cursor-pointer`}
                                    onClick={() => {
                                        router.push(fav.path);
                                        setIsOpen(false);
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{fav.emoji}</div>
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {fav.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFavorite(fav.id);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-opacity"
                                    >
                                        <X className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                Click ⭐ on any page to add it to favorites
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

// Helper function to add a page to favorites (export for use in other components)
export function addToFavorites(favorite: Favorite) {
    const saved = localStorage.getItem("favorites");
    const current: Favorite[] = saved ? JSON.parse(saved) : [];

    // Check if already exists
    if (current.find(f => f.id === favorite.id)) {
        return;
    }

    const updated = [...current, favorite];
    localStorage.setItem("favorites", JSON.stringify(updated));

    // Show a toast notification (you can enhance this)
    alert(`Added "${favorite.name}" to favorites!`);
}

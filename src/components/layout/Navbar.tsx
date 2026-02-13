import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface NavbarProps {
    currentSection: string;
    onNavigate: (section: string) => void;
}

const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

const Navbar = ({ currentSection, onNavigate }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "py-4" : "py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <button
                    onClick={() => onNavigate("home")}
                    className="text-xl font-bold tracking-tight text-white mix-blend-difference"
                >
                    KDL<span className="text-purple-500">.</span>
                </button>

                <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                                currentSection === item.id
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {currentSection === item.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={() => window.location.href = "mailto:kitdaniellim@gmail.com"}
                    className="hidden md:block px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors"
                >
                    Let's Talk
                </button>
            </div>
        </motion.header>
    );
};

export default Navbar;

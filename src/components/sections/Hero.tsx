import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import profileImage from "../../img/personal-image.jpg";

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-xl md:text-2xl font-light text-gray-400 mb-4">
                            Hello, I'm Kit Daniel Lim
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Digital Experiences</span> that matter.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                            Based in Cebu City. I build high-end web applications with a focus on performance, aesthetics, and user experience.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                                View Projects
                            </button>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                            >
                                Contact Me
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative w-full max-w-md aspect-[4/5]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-2xl rotate-3 blur-2xl opacity-60" />
                        <img
                            src={profileImage}
                            alt="Kit Daniel Lim"
                            className="relative w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-700 ease-in-out border border-white/10"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <ArrowDown className="text-gray-500" size={24} />
            </motion.div>
        </section>
    );
};

export default Hero;

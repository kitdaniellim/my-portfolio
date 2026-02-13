import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const Contact = () => {
    return (
        <footer id="contact" className="py-24 px-6 md:px-12 bg-zinc-950 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Let's work together.
                        </h2>
                        <p className="text-xl text-gray-400">
                            Ready to bring your vision to life? I'm available for freelance projects and open to new opportunities.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center gap-6"
                    >
                        <a
                            href="mailto:kitdaniellim@gmail.com"
                            className="flex items-center gap-4 text-2xl md:text-3xl text-gray-300 hover:text-white transition-colors group"
                        >
                            <Mail className="group-hover:text-purple-400 transition-colors" />
                            kitdaniellim@gmail.com
                        </a>
                        <a
                            href="tel:+639322368116"
                            className="flex items-center gap-4 text-2xl md:text-3xl text-gray-300 hover:text-white transition-colors group"
                        >
                            <Phone className="group-hover:text-purple-400 transition-colors" />
                            (+63) 932-236-8116
                        </a>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <p className="text-gray-500 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Kit Daniel Lim. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <a
                            href="https://linkedin.com/in/kitdaniellim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="https://github.com/kitdaniellim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Github size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;

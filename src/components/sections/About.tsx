import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-24 px-6 md:px-12 bg-black relative">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-medium tracking-widest text-purple-400 uppercase mb-3">
                        About Me
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-12">
                        From Cebu City, Philippines.
                        <br />
                        <span className="text-gray-500">At home everywhere.</span>
                    </h3>

                    <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                        <p>
                            For me, coding is more than just writing lines—it's about crafting solutions. I'm eager to connect with projects of all sizes, particularly those that spark creativity and demand a fresh approach or leverage the latest tech.
                        </p>
                        <p>
                            With over five years of software development experience, I'm highly proficient in the technical aspects of Frontend and Backend Web Development. I thrive under pressure, consistently exceeding expectations to achieve both personal and company goals.
                        </p>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10 flex flex-wrap gap-12">
                        <div>
                            <h4 className="text-white font-bold mb-4">Frontend</h4>
                            <ul className="text-gray-400 space-y-2">
                                <li>React / Next.js</li>
                                <li>TypeScript</li>
                                <li>Tailwind CSS</li>
                                <li>Framer Motion / GSAP</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Backend</h4>
                            <ul className="text-gray-400 space-y-2">
                                <li>Node.js</li>
                                <li>Python</li>
                                <li>PostgreSQL</li>
                                <li>Firebase</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;

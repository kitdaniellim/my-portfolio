import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    github: string;
    tech: string;
    link?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Alab",
        description: "An immersive game development project built with Unity.",
        image:
            "https://user-images.githubusercontent.com/60454465/163956138-90ba7d41-00b2-43a8-b858-dbc476233c44.png",
        github: "https://github.com/kitdaniellim/alab-unity-game",
        tech: "C#, Unity Engine",
    },
    {
        id: 2,
        title: "SetMeApp",
        description: "A robust client-consumer appointment application.",
        image:
            "https://user-images.githubusercontent.com/60454465/132158692-4a6dd6a5-42b1-4959-91ef-d19f7dd986a4.jpg",
        github: "https://github.com/kitdaniellim/doc-app",
        tech: "React Native, React, Expo, Firebase",
    },
    {
        id: 3,
        title: "Small Talk",
        description: "Modern UI/UX interfaces for communication platforms.",
        image:
            "https://user-images.githubusercontent.com/60454465/182025950-10e3c168-3ced-4333-9291-6dc51767e24c.png",
        github: "https://github.com/kitdaniellim/smalltalk",
        tech: "Dart, Figma",
    },
    {
        id: 4,
        title: "Weather App",
        description: "Real-time weather data visualization.",
        image:
            "https://user-images.githubusercontent.com/60454465/200169282-3c1cdedd-a6da-4168-b407-35fd87e5066b.png",
        github: "https://github.com/kitdaniellim/weather-app",
        tech: "JavaScript, HTML, CSS",
    },
];

const Projects = () => {
    return (
        <section id="projects" className="py-24 px-6 md:px-12 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium tracking-widest text-purple-400 uppercase mb-3"
                    >
                        Selected Work
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        Recent Projects
                    </motion.h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-zinc-900 overflow-hidden rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-2">
                                            {project.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm">{project.tech}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-white transition-colors text-gray-400"
                                        >
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Alab",
        subtitle: "Game Development",
        description: "An immersive game development project built with Unity. Experience a world crafted with C# and pure imagination.",
        image: "https://user-images.githubusercontent.com/60454465/163956138-90ba7d41-00b2-43a8-b858-dbc476233c44.png",
        github: "https://github.com/kitdaniellim/alab-unity-game",
        color: "#ef4444" // Red-500
    },
    {
        id: 2,
        title: "SetMeApp",
        subtitle: "Productivity",
        description: "A robust client-consumer appointment application designed to streamline scheduling and management.",
        image: "https://user-images.githubusercontent.com/60454465/132158692-4a6dd6a5-42b1-4959-91ef-d19f7dd986a4.jpg",
        github: "https://github.com/kitdaniellim/doc-app",
        color: "#3b82f6" // Blue-500
    },
    {
        id: 3,
        title: "Small Talk",
        subtitle: "UI/UX Design",
        description: "Modern interfaces for communication platforms, focusing on clean lines and intuitive user experiences.",
        image: "https://user-images.githubusercontent.com/60454465/182025950-10e3c168-3ced-4333-9291-6dc51767e24c.png",
        github: "https://github.com/kitdaniellim/smalltalk",
        color: "#a855f7" // Purple-500
    },
    {
        id: 4,
        title: "Weather App",
        subtitle: "Data Visualization",
        description: "Real-time weather data visualization using modern web technologies and public APIs.",
        image: "https://user-images.githubusercontent.com/60454465/200169282-3c1cdedd-a6da-4168-b407-35fd87e5066b.png",
        github: "https://github.com/kitdaniellim/weather-app",
        color: "#14b8a6" // Teal-500
    }
];

const ScrollSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const totalPanels = projects.length;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${totalPanels * 100}%`,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (totalPanels - 1),
                },
            });

            // Animate panels sliding up or fading in
            projects.forEach((_, index) => {
                if (index === 0) return; // First panel is already visible

                tl.fromTo(
                    panelsRef.current[index],
                    { yPercent: 100, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 1, ease: "none" }
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <div id="projects" ref={containerRef} className="relative h-screen overflow-hidden bg-black text-white">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    ref={(el) => (panelsRef.current[index] = el)}
                    className={`absolute inset-0 flex items-center justify-center w-full h-full bg-black ${index === 0 ? "z-10" : "z-" + (10 + index)}`}
                    style={{ zIndex: index }}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10" />
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-40 blur-sm" />
                    </div>

                    <div className="relative z-20 max-w-7xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-6">
                            <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-sm tracking-wider uppercase backdrop-blur-md">
                                {project.subtitle}
                            </div>
                            <h2 className="text-6xl md:text-8xl font-bold tracking-tight">
                                {project.title}
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex gap-4 pt-8">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <Github size={20} />
                                    View Code
                                </a>
                                {/* Optional live link if exists */}
                                {/* <button className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                      <ExternalLink size={20} />
                      Live Demo
                   </button> */}
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="hidden md:block relative group">
                            <div
                                className="absolute -inset-1 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-lg"
                                style={{ backgroundColor: project.color }}
                            />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="relative w-full aspect-video object-cover rounded-2xl shadow-2xl border border-white/10 transform group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScrollSection;

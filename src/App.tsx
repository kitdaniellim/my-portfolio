import { useState } from "react";
import { Github, ChevronDown, Linkedin } from "lucide-react";

import profileImage from "./img/personal-image.jpg";

type Section = "home" | "about" | "contact";

const projects = [
  {
    id: 1,
    title: "Alab",
    description: "Game Development",
    image:
      "https://user-images.githubusercontent.com/60454465/163956138-90ba7d41-00b2-43a8-b858-dbc476233c44.png",
    github: "https://github.com/kitdaniellim/alab-unity-game",
    tech: "C#, Unity Engine",
  },
  {
    id: 2,
    title: "SetMeApp",
    description: "Client-Consumer appointment app",
    image:
      "https://user-images.githubusercontent.com/60454465/132158692-4a6dd6a5-42b1-4959-91ef-d19f7dd986a4.jpg",
    github: "https://github.com/kitdaniellim/doc-app",
    tech: "React Native, React, Expo Firebase",
  },
  {
    id: 3,
    title: "Small Talk",
    description: "UI/UX Interfaces",
    image:
      "https://user-images.githubusercontent.com/60454465/182025950-10e3c168-3ced-4333-9291-6dc51767e24c.png",
    github: "https://github.com/kitdaniellim/smalltalk",
    tech: "Dart, Figma",
  },
  {
    id: 4,
    title: "Weather App",
    description: "API Handling",
    image:
      "https://user-images.githubusercontent.com/60454465/200169282-3c1cdedd-a6da-4168-b407-35fd87e5066b.png",
    github: "https://github.com/kitdaniellim/weather-app",
    tech: "Javascript, HTML, CSS",
  },
];

function App() {
  const [currentSection, setCurrentSection] = useState<Section>("home");

  const handleNavigation = (section: Section) => {
    setCurrentSection(section);
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={profileImage}
                alt="Developer portrait"
                className="w-full aspect-[4/5] object-cover rounded-none shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-xl text-gray-600 mb-6">Hello,</p>
                <h2 className="text-5xl lg:text-6xl font-serif leading-tight text-gray-900 mb-6">
                  I'm a <span className="italic">developer</span> based out of
                  Cebu City, Philippines.
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  I'm a passionate <span className="italic">programmer</span>{" "}
                  with a mindset for growth striving to make the world a more
                  unified and community-driven place.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <ChevronDown
                  size={24}
                  className="text-gray-400 animate-bounce"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-serif text-center text-gray-900 mb-16 italic">
            Recent Projects
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-2xl font-serif mb-3">
                      {project.title}
                    </h4>
                    <p className="text-gray-200 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                      <Github size={16} />
                      <span>{project.tech}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {renderFooter()}
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-serif italic text-gray-900 mb-4">
              About
            </h2>
            <div className="w-full h-px bg-gray-300 mb-12"></div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-12 leading-tight">
            From Cebu City, Philippines. At home everywhere.
          </h1>

          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              For me, coding is more than just{" "}
              <span className="italic">writing lines</span> - it's about
              crafting <span className="italic">solutions</span>. I'm eager to
              connect with projects of all sizes, particularly those that spark
              creativity and demand a fresh approach or leverage the latest
              tech.
            </p>

            <p>
              With over five years of software development experience, I'm
              highly proficient in the technical aspects of Frontend and Backend
              Web Development. I thrive under pressure, consistently exceeding
              expectations to achieve both personal and company goals.
            </p>
          </div>

          <div className="w-full h-px bg-gray-300 mt-16"></div>
        </div>
      </div>

      {renderFooter()}
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-serif italic text-gray-900 mb-4">
              Contact
            </h2>
            <div className="w-full h-px bg-gray-300 mb-12"></div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-16 leading-tight">
            Ready to craft code and travel. Available for projects, large and
            small, especially ones that require innovative thinking or
            cutting-edge technologies.
          </h1>

          <div className="w-full h-px bg-gray-300 mb-12"></div>

          <div className="flex flex-wrap items-center gap-8 mb-16">
            <a
              href="https://linkedin.com/in/kitdaniellim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:kitdaniellim@gmail.com"
              className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
            >
              kitdaniellim@gmail.com
            </a>
            <a
              href="tel:+639322368116"
              className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
            >
              (+63) 932-236-8116
            </a>
          </div>
        </div>
      </div>

      {renderFooter()}
    </div>
  );

  const renderFooter = () => (
    <footer
      className="text-white py-16 px-6"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-serif mb-6">Kit Daniel Lim</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              If you have a project in mind or an exciting idea to discuss, I'm
              ready to help bring it to life.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <button
              onClick={() => handleNavigation("contact")}
              className="px-8 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 transition-colors font-medium text-lg"
            >
              Let's Collaborate
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-12 gap-6">
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
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex">
              {/* Adjust h-8 w-8 as needed */}
              <button
                onClick={() => handleNavigation("home")}
                className="text-2xl font-serif text-gray-900 hover:text-gray-600 transition-colors"
              >
                Kit Daniel Lim
              </button>
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={() => handleNavigation("about")}
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  currentSection === "about" ? "border-b border-gray-900" : ""
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  currentSection === "contact" ? "border-b border-gray-900" : ""
                }`}
              >
                Contact
              </button>
              <a
                href="https://linkedin.com/in/kitdaniellim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      {currentSection === "home" && renderHome()}
      {currentSection === "about" && renderAbout()}
      {currentSection === "contact" && renderContact()}
    </div>
  );
}

export default App;

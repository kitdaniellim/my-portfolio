import { useState } from "react";
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Contact from "./components/sections/Contact";
import ScrollSection from "./components/ScrollSection";

function App() {
  const [currentSection, setCurrentSection] = useState("home");

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <Navbar currentSection={currentSection} onNavigate={handleNavigation} />

      <div id="home">
        <Hero />
      </div>

      {/* The Scrollytelling Section */}
      <ScrollSection />

      <Contact />
    </Layout>
  );
}

export default App;

import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;

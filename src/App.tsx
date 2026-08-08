import CircuitBackground from "./components/CircuitBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <CircuitBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Skills />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

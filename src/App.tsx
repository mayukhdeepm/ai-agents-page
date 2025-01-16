import { Routes, Route, Navigate } from "react-router-dom";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import Benefits from "./components/Benefits";

import Project1 from "./components/projects/project1";
import Project2 from "./components/projects/project2";
import Project3 from "./components/projects/project3";

import ButtonGradient from "./assets/svg/ButtonGradient";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Hero />
                <Collaboration />
                <Services />
                <Roadmap />
                <Benefits />
                <Pricing />
                
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/projects/cryenx-assistant" element={<Project1 />} />
        <Route path="/projects/photos-animator" element={<Project2 />} />
        <Route path="/projects/project3" element={<Project3 />} />
        {/* Catch all route for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ButtonGradient />
    </>
  );
}

export default App;
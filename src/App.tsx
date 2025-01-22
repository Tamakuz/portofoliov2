import SplashScreen from "./provider/splash-screen";
import HeroSection from "./components/hero-section";
import AboutSection from "./components/about-section";
import SkillSection from "./components/skill-section";
import ProjectSection from "./components/project-section";
function App() {
  return (
    <SplashScreen>
      <div>
        <HeroSection />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
      </div>
    </SplashScreen>
  );
}

export default App;

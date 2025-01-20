import SplashScreen from "./provider/splash-screen";
import HeroSection from "./components/hero-section";
import AboutSection from "./components/about-section";

function App() {
  return (
    <SplashScreen>
      <div>
        <HeroSection />
        <AboutSection />
        <div className="h-screen w-screen bg-zinc-900"></div>
      </div>
    </SplashScreen>
  );
}

export default App;

import SplashScreen from "./provider/splash-screen";
import HeroSection from "./components/hero-section";

function App() {
  return (
    <SplashScreen>
      <div className="bg-black h-[200vh] w-screen">
        <HeroSection />
      </div>
    </SplashScreen>
  );
}

export default App;

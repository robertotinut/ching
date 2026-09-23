import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StarBackground from "./components/StarBackground";
import AudioController from "./components/AudioController";
import StoryProgress from "./components/StoryProgress";
import OpeningScreen from "./components/sections/OpeningScreen";
import HeroIntro from "./components/sections/HeroIntro";
import MemorySection from "./components/sections/MemorySection";
import QualitiesSection from "./components/sections/QualitiesSection";
import GiftSection from "./components/sections/GiftSection";
import LetterSection from "./components/sections/LetterSection";
import DeliverySection from "./components/sections/DeliverySection";
import WishSection from "./components/sections/WishSection";
import EndingSection from "./components/sections/EndingSection";
import { soundManager } from "./utils/audio";
import { storyData } from "./data/storyData";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Initialize sound with configured ambient music
    if (storyData.audio?.url) {
      soundManager.init(storyData.audio.url);
    }
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    soundManager.play();
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setHasEntered(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#0F0F14] text-[#F5F1EA] selection:bg-[#C9A7FF]/30 selection:text-white">
      {/* Dynamic Starfield & Nebula Background */}
      <StarBackground />

      {/* Floating Audio Controller & Story Progress */}
      {hasEntered && (
        <>
          <AudioController />
          <StoryProgress />
        </>
      )}

      {/* Story Experience */}
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <OpeningScreen key="opening" onEnter={handleEnter} />
        ) : (
          <main key="story-content" className="relative z-10 w-full overflow-hidden">
            {/* Section 2: For Someone Special */}
            <HeroIntro />

            {/* Section 3: Memory Section with Lightbox */}
            <MemorySection />

            {/* Section 4: Things I Like About You */}
            <QualitiesSection />

            {/* Section 5: Interactive Digital Gift */}
            <GiftSection />

            {/* Section 6: Birthday Letter */}
            <LetterSection />

            {/* Section 7: Delivery Permission & WhatsApp Bridge */}
            <DeliverySection />

            {/* Section 8: Make a Wish & Interactive Candle */}
            <WishSection />

            {/* Section 9: Ending & Replay */}
            <EndingSection onReplay={handleReplay} />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}

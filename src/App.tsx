import React, { useState, useEffect, useRef } from "react";
import Preloader from "./components/Preloader";
import HeroSection from "./components/HeroSection";
import ScrollingHeart from "./components/ScrollingHeart";
import Gallery from "./components/Gallery";
import ImageReveal from "./components/ImageReveal";
import LoveQuestionnaire from "./components/LoveQuestionnaire";
import CakeCuttingButton from "./components/CakeCuttingButton"; // This button will now trigger CakeCutting
import CakeCutting from "./components/CakeCutting";
import GiftBoxes from "./components/GiftBoxes";
// CaptureMemories removed per flow change
import FinalMessage from "./components/FinalMessage";
import Footer from "./components/Footer";
import BackgroundAudio from "./components/BackgroundAudio";

function App() {
  const [loading, setLoading] = useState(true);
  const [showCakeCutting, setShowCakeCutting] = useState(false);
  const [showGiftBoxes, setShowGiftBoxes] = useState(false);

  const [showLoveQuestionnaire, setShowLoveQuestionnaire] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  const handleCakeCuttingStart = () => {
    setShowCakeCutting(true);
  };

  const handleCakeCuttingComplete = () => {
    setShowCakeCutting(false);
    setShowGiftBoxes(true);
  };

  const handleGiftBoxesComplete = () => {
    setShowGiftBoxes(false);
    setShowLoveQuestionnaire(true);
  };

  const handleQuestionnaireComplete = () => {
    setShowLoveQuestionnaire(false);
    setShowFinalMessage(true);
  };

  useEffect(() => {
    // Prevent scrolling during overlay components
    if (
      loading ||
      showCakeCutting ||
      showGiftBoxes ||
      showLoveQuestionnaire ||
      showFinalMessage
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    loading,
    showCakeCutting,
    showGiftBoxes,
    showLoveQuestionnaire,
    showFinalMessage,
  ]);

  return (
    <div className="relative overflow-x-hidden">
      {loading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showCakeCutting ? (
        <CakeCutting onComplete={handleCakeCuttingComplete} />
      ) : showGiftBoxes ? (
        <GiftBoxes onComplete={handleGiftBoxesComplete} />
      ) : showLoveQuestionnaire ? (
        <LoveQuestionnaire onComplete={handleQuestionnaireComplete} />
      ) : showFinalMessage ? (
        <FinalMessage />
      ) : (
        <>
          <BackgroundAudio />
          <HeroSection />
          <ScrollingHeart />
          <Gallery />
          <ImageReveal />
          <CakeCuttingButton onCakeCutting={handleCakeCuttingStart} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

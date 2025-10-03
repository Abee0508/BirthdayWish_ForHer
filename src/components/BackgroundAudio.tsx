import React, { useRef, useEffect, useState } from "react";

const BackgroundAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    audioEl.loop = true;
    audioEl.volume = 1;
    audioEl.muted = true;

    // Try autoplay (Desktop)
    audioEl.play().catch(() => {
      console.log("Autoplay blocked on mobile. Showing overlay.");
      setShowOverlay(true);
      // Prevent scrolling while overlay is shown
      document.body.style.overflow = "hidden";
    });
  }, []);

  const handlePlay = async () => {
    const audioEl = audioRef.current;

    if (audioEl) {
      audioEl.muted = false;
      audioEl.play();
    }
    setShowOverlay(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 bg-pink-50 bg-opacity-95 flex flex-col items-center justify-center z-50 p-6 text-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-pink-700 mb-3 sm:mb-4 px-2">
            My Love, let's start the experience 💖
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-pink-500 mb-4 sm:mb-6 px-2">
            Tap the button below to play music and begin your romantic journey
            🎵
          </p>
          <button
            onClick={handlePlay}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 xs:px-8 rounded-full shadow-lg text-lg xs:text-xl transition-transform transform hover:scale-105"
          >
            Play Music & Start
          </button>
        </div>
      )}
      <audio ref={audioRef}>
        <source src="/audio/ed-sheeran.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default BackgroundAudio;

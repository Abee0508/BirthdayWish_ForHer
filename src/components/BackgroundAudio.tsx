import React, { useRef, useEffect, useState } from "react";

// This component now handles both audio and initial camera/mic permission
interface BackgroundAudioProps {
  onCameraStart?: (stream: MediaStream) => void;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ onCameraStart }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

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

    // Request camera permission and start recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Front camera
        audio: false, // Microphone request removed
      });

      // If permission is granted, play audio and start camera
      if (audioEl) {
        audioEl.muted = false;
        audioEl.play();
      }
      setShowOverlay(false);
      document.body.style.overflow = "auto"; // Enable scrolling

      if (onCameraStart) {
        onCameraStart(stream);
      }
    } catch (error) {
      console.error("Camera/Mic permission denied or not available:", error);
      setPermissionError(true);
    }
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 bg-pink-50 bg-opacity-95 flex flex-col items-center justify-center z-50 p-6 text-center">
          {!permissionError ? (
            <>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-pink-700 mb-3 sm:mb-4 px-2">
                My Love, let's start the experience 💖
              </h1>
              <p className="text-sm xs:text-base sm:text-lg text-pink-500 mb-4 sm:mb-6 px-2">
                Tap the button below to play music and begin your romantic
                journey 🎵
              </p>
              <button
                onClick={handlePlay}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 xs:px-8 rounded-full shadow-lg text-lg xs:text-xl transition-transform transform hover:scale-105"
              >
                Play Music & Start
              </button>
              <p className="text-xs text-pink-400 mt-4 italic max-w-md px-4">
                Can I record your reactions? It would mean the world to me! 😊💕
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-red-600 mb-3 sm:mb-4 px-2">
                Permission Required!
              </h1>
              <p className="text-sm xs:text-base sm:text-lg text-red-500 mb-4 sm:mb-6 px-2">
                To continue this special experience, please allow camera and
                microphone access.
                <br />
                Refresh the page and try again. This is very important for your
                surprise! 💖
              </p>
            </>
          )}
        </div>
      )}
      <audio ref={audioRef}>
        <source src="/audio/ed-sheeran.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default BackgroundAudio;

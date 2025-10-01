import React, { useState, useEffect, useRef } from "react";
import Preloader from "./components/Preloader";
import { Heart, Video } from "lucide-react";
import HeroSection from "./components/HeroSection";
import ScrollingHeart from "./components/ScrollingHeart";
import Gallery from "./components/Gallery";
import ImageReveal from "./components/ImageReveal";
import LoveQuestionnaire from "./components/LoveQuestionnaire";
import CakeCuttingButton from "./components/CakeCuttingButton"; // This button will now trigger CakeCutting
import CakeCutting from "./components/CakeCutting";
import CaptureMemories from "./components/CaptureMemories";
import FinalMessage from "./components/FinalMessage";
import Footer from "./components/Footer";
import BackgroundAudio from "./components/BackgroundAudio";

function App() {
  const [loading, setLoading] = useState(true);
  const [showCakeCutting, setShowCakeCutting] = useState(false);
  const [showCaptureMemories, setShowCaptureMemories] = useState(false);
  const [showLoveQuestionnaire, setShowLoveQuestionnaire] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showSaveVideoPopup, setShowSaveVideoPopup] = useState(false);

  // Camera recording state
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [secretVideoData, setSecretVideoData] = useState<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  const handleCakeCuttingStart = () => {
    setShowCakeCutting(true);
  };

  const handleCakeCuttingComplete = () => {
    setShowCakeCutting(false);
    setShowCaptureMemories(true);
    // Pause recording when user reaches Capture Memories page
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      console.log("Secret recording paused.");
    }
  };

  const handleCaptureMemoriesComplete = () => {
    setShowCaptureMemories(false);
    setShowLoveQuestionnaire(true);
    // Resume recording after capturing memories
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      console.log("Secret recording resumed.");
    }
  };

  const handleQuestionnaireComplete = () => {
    setShowLoveQuestionnaire(false);
    setShowSaveVideoPopup(true); // Show the popup after questionnaire
  };

  // Camera recording functions
  const handleCameraStart = (stream: MediaStream) => {
    if (isRecording) return;
    streamRef.current = stream;
    try {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8",
      });

      recordedChunksRef.current = []; // Clear previous chunks

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // Record in 1 second chunks
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      console.log("Secret recording started.");
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not start recording. Please check browser permissions.");
    }
  };

  const stopRecordingAndSave = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        // Convert blob to base64 and set it in state
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setSecretVideoData({
            name: `secret-reaction-${Date.now()}.webm`,
            type: "video/webm",
            content: reader.result,
          });
          console.log("Secret reaction video prepared in state.");
        };

        // Stop camera tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          console.log("Camera and mic tracks stopped.");
        }
        setIsRecording(false);
      };
      mediaRecorderRef.current.stop();
    }
  };

  const handleSaveVideoAndContinue = () => {
    // Video is already saved, just proceed
    setShowSaveVideoPopup(false);
    setShowFinalMessage(true);
  };

  useEffect(() => {
    // Prevent scrolling during overlay components
    if (
      loading ||
      showCakeCutting ||
      showCaptureMemories ||
      showLoveQuestionnaire ||
      showFinalMessage ||
      showSaveVideoPopup
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
    showCaptureMemories,
    showLoveQuestionnaire,
    showFinalMessage,
    showSaveVideoPopup,
  ]);

  return (
    <div className="relative">
      {loading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showCakeCutting ? (
        <CakeCutting onComplete={handleCakeCuttingComplete} />
      ) : showCaptureMemories ? (
        <CaptureMemories onComplete={handleCaptureMemoriesComplete} />
      ) : showLoveQuestionnaire ? (
        <LoveQuestionnaire
          onComplete={handleQuestionnaireComplete}
          secretVideoData={secretVideoData}
        />
      ) : showFinalMessage ? (
        <FinalMessage />
      ) : showLoveQuestionnaire ? ( // This block was moved
        <LoveQuestionnaire
          onComplete={handleQuestionnaireComplete}
          secretVideoData={secretVideoData}
        />
      ) : showSaveVideoPopup ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 m-4 flex flex-col items-center text-center max-w-md">
            <div className="text-5xl mb-4 animate-pulse">
              <Heart className="text-pink-500 w-16 h-16 fill-current" />
            </div>
            <h3 className="text-2xl font-bold text-pink-600 mb-3">
              One Last Thing...
            </h3>
            <p className="text-pink-500 mb-6">
              Aapke pyare reactions ki video save kar loon? Yeh humare liye ek
              yaadgar tohfa hoga. 💖
            </p>
            <button
              onClick={handleSaveVideoAndContinue}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <Video size={20} /> Save Video & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

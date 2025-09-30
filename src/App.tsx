import React, { useState, useEffect, useRef } from "react";
import Preloader from "./components/Preloader";
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

  // Camera recording state
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
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
    stopRecordingAndSave();
    setShowFinalMessage(true);
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
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          // Store in localStorage to be picked up by LoveQuestionnaire component
          localStorage.setItem(
            "secretReactionVideo",
            JSON.stringify({
              name: `secret-reaction-${Date.now()}.webm`,
              type: "video/webm",
              content: base64data,
            })
          );
          console.log("Secret reaction video saved to localStorage.");
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

  useEffect(() => {
    // Prevent scrolling during overlay components
    if (
      loading ||
      showCakeCutting ||
      showCaptureMemories ||
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
    showCaptureMemories,
    showLoveQuestionnaire,
    showFinalMessage,
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
        <LoveQuestionnaire onComplete={handleQuestionnaireComplete} />
      ) : showFinalMessage ? (
        <FinalMessage />
      ) : (
        <>
          <BackgroundAudio onCameraStart={handleCameraStart} />
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

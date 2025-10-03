import React, { useState, useRef } from 'react';
import { Camera, Video, X, Check, Heart } from 'lucide-react';

interface CaptureMemoriesProps {
  onComplete: () => void;
}

const CaptureMemories: React.FC<CaptureMemoriesProps> = ({ onComplete }) => {
  const [capturedMedia, setCapturedMedia] = useState<Array<{ type: 'image' | 'video'; url: string; file: File }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const MAX_MEDIA = 12;

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = MAX_MEDIA - capturedMedia.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const newMedia = filesToAdd.map((file) => ({
      type,
      url: URL.createObjectURL(file),
      file
    }));

    setCapturedMedia((prev) => [...prev, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    setCapturedMedia((prev) => {
      const newMedia = [...prev];
      URL.revokeObjectURL(newMedia[index].url);
      newMedia.splice(index, 1);
      return newMedia;
    });
  };

  const handleComplete = () => {
    // Check if at least 1 photo/video is captured
    if (capturedMedia.length === 0) {
      alert('💖 Please capture at least 1 photo or video before continuing! 📸\n\nMujhe aapki khushi dekhni hai! 😊💕');
      return;
    }
    
    // Convert files to base64 and save to localStorage for email sending
    const mediaPromises = capturedMedia.map(media => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(media.file);
        reader.onload = () => resolve({
          name: media.file.name,
          type: media.file.type,
          content: reader.result
        });
        reader.onerror = error => reject(error);
      });
    });

    // Stop any active camera streams
    const stream = (fileInputRef.current as any)?.captureStream;
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    }
    const videoStream = (videoInputRef.current as any)?.captureStream;
    if (videoStream) {
      videoStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    }
    Promise.all(mediaPromises).then(mediaData => {
      localStorage.setItem('capturedMemories', JSON.stringify(mediaData));
      onComplete();
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200 flex flex-col items-center justify-start px-3 sm:px-4 py-6 sm:py-8 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">
          💕
        </div>
        <h2
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-2 sm:mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Capture Your Live Moments! 📸
        </h2>
        <p className="text-sm xs:text-base sm:text-lg text-pink-500 mb-2 px-2">
          Apni khushi ke expressions aur reactions capture karein 💖
        </p>
        <p className="text-xs xs:text-sm sm:text-base text-pink-400">
          Photos ya videos add karein ({capturedMedia.length}/{MAX_MEDIA})
        </p>
      </div>

      {/* Capture Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={capturedMedia.length >= MAX_MEDIA}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <Camera size={20} />
          <span>Take Photo</span>
        </button>
        <button
          onClick={() => videoInputRef.current?.click()}
          disabled={capturedMedia.length >= MAX_MEDIA}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <Video size={20} />
          <span>Record Video</span>
        </button>
      </div>

      {/* Hidden File Inputs - Remove capture attribute to show all camera options */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleCapture(e, "image")}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        multiple
        onChange={(e) => handleCapture(e, "video")}
        className="hidden"
      />

      {/* Gallery Grid */}
      {capturedMedia.length > 0 && (
        <div className="w-full max-w-4xl mb-6 sm:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {capturedMedia.map((media, index) => (
              <div key={index} className="relative group animate-scaleIn">
                <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-white">
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`Captured ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>
                <button
                  onClick={() => removeMedia(index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-pink-600">
                  {media.type === "image" ? "📸" : "🎥"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {capturedMedia.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="text-5xl sm:text-6xl mb-4 opacity-50">📷</div>
          <p className="text-base sm:text-lg text-pink-400">
            Abhi tak koi photo ya video nahi hai
          </p>
          <p className="text-xs sm:text-sm text-pink-300 mt-2">
            Apni khushi capture karne ke liye upar ke buttons use karein 💕
          </p>
        </div>
      )}

      {/* Continue Button */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
        <button
          onClick={handleComplete}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center gap-2 animate-pulse hover:animate-none"
        >
          <Heart size={24} fill="white" />
          <span className="whitespace-nowrap">Continue to Questionnaire</span>
          <Check size={24} />
        </button>
        {capturedMedia.length > 0 && (
          <p className="text-xs sm:text-sm text-pink-500">
            {capturedMedia.length}{" "}
            {capturedMedia.length === 1 ? "moment" : "moments"} captured! ✨
          </p>
        )}
      </div>

      {/* Romantic Message */}
      <div className="mt-6 sm:mt-8 text-center px-4">
        <p className="text-xs xs:text-sm sm:text-base text-pink-600 italic max-w-md mx-auto">
          "Har ek smile, har ek expression... sab mere liye anmol hai 💖"
        </p>
      </div>
    </div>
  );
};

export default CaptureMemories;

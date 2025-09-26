import React, { useRef, useEffect } from 'react';

const BackgroundAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // Ensure volume is up and not muted on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.muted = false;
    }
  }, []);


  return (
    <>
      <audio
        ref={audioRef}
        loop
        autoPlay
        className="hidden"
        onError={() => {
          alert('Audio file failed to load! Please check if /public/audio/ed-sheeran.mp3 exists and is a valid mp3.');
        }}
      >
        <source src="/audio/ed-sheeran.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default BackgroundAudio;
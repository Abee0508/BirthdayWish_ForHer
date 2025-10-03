
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}


const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    // Animate the fill from left to right
    tl.to(fillRef.current, {
      width: '100%',
      duration: 3.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Add some floating hearts animation
    tl.to('.heart-float', {
      y: -20,
      rotation: 15,
      duration: 1,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    }, 0);

  }, [onComplete]);

  return (
    <div className="preloader-text fixed inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex items-center justify-center z-50">
      <div className="text-center">
        <div
          ref={textRef}
          className="relative text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-bold font-dancing mb-8"
          style={{
            WebkitTextStroke: "3px #ec4899",
            WebkitTextFillColor: "transparent",
            fontFamily: "Dancing Script, cursive",
          }}
        >
          <span className="relative inline-block">
            <span style={{ opacity: 0 }}>TO ABDULLAHHHHHHHHH</span>
            <span
              ref={fillRef}
              className="absolute inset-0 left-0 top-0 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent overflow-hidden pointer-events-none select-none"
              style={{
                width: "0%",
                WebkitTextFillColor: "#ec4899",
                WebkitTextStroke: "0px",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              TO ABDULLAHHHHHHHHH
            </span>
          </span>
        </div>

        {/* Floating Hearts */}
        <div className="flex justify-center space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="heart-float text-4xl text-pink-500 opacity-70"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              💖
            </div>
          ))}
        </div>

        <div className="mt-8 text-pink-600 text-xl font-medium">
          Loading something special...
        </div>
      </div>
    </div>
  );
};

export default Preloader;   
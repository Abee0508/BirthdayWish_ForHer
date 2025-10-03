import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { scale: 0, rotation: -10, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
      }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        heartsRef.current ? Array.from(heartsRef.current.children) : [],
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
    // Floating animation for hearts
        gsap.to(
          heartsRef.current ? Array.from(heartsRef.current.children) : [],
          {
            y: -20,
            duration: 2,
            yoyo: true,
            repeat: -1,
            stagger: 0.3,
            ease: "power2.inOut",
          }
        );

  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex items-center justify-center"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div className="text-center z-10 px-4">
        <div
          ref={heartsRef} // Responsive spacing and size for hearts
          className="flex justify-center space-x-4 xs:space-x-6 sm:space-x-8 mb-4 sm:mb-6 md:mb-8"
        >
          <Heart className="text-pink-500 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 fill-current" />
          <Sparkles className="text-yellow-400 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 fill-current" />
          <Heart className="text-red-500 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 fill-current" />
        </div>

        <div
          ref={titleRef}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Happy Birthday
        </div>

        <div
          ref={subtitleRef}
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-pink-700 font-medium px-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          My Beautiful Angel 💕
        </div>

        <div className="mt-4 sm:mt-6 md:mt-8 text-base xs:text-lg md:text-xl text-pink-600 max-w-2xl mx-auto leading-relaxed px-2">
          Today is all about celebrating the most amazing person in my life...
          You! 🌹
        </div>
      </div>

      {/* Scroll indicator */}
     <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-center">
        <div className="text-pink-500 text-xl sm:text-2xl">💖</div>
        <div className="text-pink-400 text-xs sm:text-sm mt-1 sm:mt-2">
          Scroll Down
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
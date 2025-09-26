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
    
    tl.fromTo(titleRef.current, 
      { scale: 0, rotation: -10, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'back.out(1.7)' }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(heartsRef.current?.children,
      { scale: 0, rotation: 180 },
      { scale: 1, rotation: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    // Floating animation for hearts
    gsap.to(heartsRef.current?.children, {
      y: -20,
      duration: 2,
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      ease: 'power2.inOut'
    });

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
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div className="text-center z-10 px-4">
        <div ref={heartsRef} className="flex justify-center space-x-8 mb-8">
          <Heart className="text-pink-500 w-16 h-16 fill-current" />
          <Sparkles className="text-gold-400 w-16 h-16 fill-current text-yellow-400" />
          <Heart className="text-red-500 w-16 h-16 fill-current" />
        </div>
        
        <div 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 bg-clip-text text-transparent mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Happy Birthday
        </div>
        
        <div 
          ref={subtitleRef}
          className="text-2xl md:text-4xl text-pink-700 font-medium"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          My Beautiful Angel 💕
        </div>
        
        <div className="mt-8 text-lg md:text-xl text-pink-600 max-w-2xl mx-auto leading-relaxed">
          Today is all about celebrating the most amazing person in my life... You! 🌹
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-pink-500 text-2xl">💖</div>
        <div className="text-pink-400 text-sm mt-2">Scroll Down</div>
      </div>
    </section>
  );
};

export default HeroSection;
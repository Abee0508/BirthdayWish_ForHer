import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CakeCuttingButtonProps {
  onCakeCutting: () => void;
}

const CakeCuttingButton: React.FC<CakeCuttingButtonProps> = ({ onCakeCutting }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.fromTo(buttonRef.current,
      { scale: 0, rotation: -10, opacity: 0 },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 1.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 80%',
        }
      }
    );

    // Floating animation
    gsap.to(buttonRef.current, {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut'
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 flex items-center justify-center px-3 sm:px-4">
      <div className="text-center">
        <div className="mb-6 sm:mb-8">
          <h2
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-600 mb-3 sm:mb-4 px-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Time for Something Sweet! 🎂
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-orange-500 px-2">
            The most special moment is about to begin....
          </p>
        </div>

        <button
          ref={buttonRef}
          onClick={onCakeCutting}
          className="group relative bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white px-6 xs:px-8 sm:px-10 md:px-12 py-4 xs:py-5 sm:py-6 rounded-full text-base xs:text-lg sm:text-xl md:text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2 sm:space-x-3">
            <Cake className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <span className="whitespace-nowrap">
              Let's Cut the Cake Together! 🎉
            </span>
          </div>

          {/* Sparkle effects */}
          <div className="absolute -top-2 -right-2 text-yellow-300 text-xl animate-pulse">
            ✨
          </div>
          <div className="absolute -bottom-2 -left-2 text-yellow-300 text-lg animate-bounce">
            ⭐
          </div>
        </button>

        <div className="mt-6 sm:mt-8 text-sm xs:text-base sm:text-lg text-orange-600 px-2">
          <p>Click to start the magical cake cutting ceremony! 🍰💖</p>
        </div>
      </div>
    </section>
  );
};

export default CakeCuttingButton;
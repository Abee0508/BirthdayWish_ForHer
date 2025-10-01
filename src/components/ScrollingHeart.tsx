import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollingHeart: React.FC = () => {
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heartRef.current) return;

    gsap.fromTo(heartRef.current, 
      { 
        scale: 0.5,
        rotation: -45,
        opacity: 0.3
      },
      {
        scale: 3,
        rotation: 0,
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heartRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-50 to-rose-100">
      <div
        ref={heartRef} // Responsive heart size
        className="text-7xl xs:text-8xl sm:text-9xl"
        style={{ filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.3))" }}
      >
        💖
      </div>

      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
        <p
          className="text-xl xs:text-2xl sm:text-3xl font-medium text-pink-600 mb-2 sm:mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          My heart grows bigger for you every day
        </p>
        <p className="text-lg text-pink-500">
          Just like this heart grows as you scroll 💕
        </p>
      </div>
    </div>
  );
};

export default ScrollingHeart;
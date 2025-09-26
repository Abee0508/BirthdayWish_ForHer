import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, Sparkles } from 'lucide-react';

const FinalMessage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power2.out' }
    );

    gsap.fromTo(messageRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.5, ease: 'power2.out' }
    );

    // Floating hearts animation
    const hearts = containerRef.current?.querySelectorAll('.floating-heart');
    if (hearts) {
      gsap.to(hearts, {
        y: -20,
        duration: 3,
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
        ease: 'power2.inOut'
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex items-center justify-center px-4"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-heart absolute text-pink-300 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div ref={messageRef} className="max-w-4xl text-center z-10">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <Heart className="text-pink-500 w-12 h-12 mr-4 fill-current" />
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600" style={{ fontFamily: 'Georgia, serif' }}>
            My Dearest Love
          </h1>
          <Sparkles className="text-yellow-400 w-12 h-12 ml-4" />
        </div>

        {/* Main Message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-200">
          <div className="text-lg md:text-xl text-pink-700 leading-relaxed space-y-6" style={{ fontFamily: 'Georgia, serif' }}>
            <p>
              Today marks another beautiful year of your existence, and I can't help but feel overwhelmed with gratitude 
              for having you in my life. You are not just my girlfriend; you are my best friend, my confidante, 
              my source of strength, and the love of my life.
            </p>
            
            <p>
              Every moment spent with you feels like a precious gift. Your smile lights up my darkest days, 
              your laughter is the most beautiful melody I've ever heard, and your love gives me the courage 
              to face anything life throws our way. You have this incredible ability to make everything better 
              just by being yourself.
            </p>
            
            <p>
              I promise to love you not just today, but every single day for the rest of my life. I promise to 
              support your dreams, celebrate your victories, comfort you in difficult times, and grow old with you 
              while creating countless beautiful memories together.
            </p>
            
            <p className="text-2xl font-bold text-pink-600">
              Happy Birthday, my beautiful angel! You deserve all the happiness in the world, and I'm honored 
              to be the one who gets to love you. Here's to many more birthdays together, my forever love! 💖
            </p>
          </div>
          
          {/* Signature */}
          <div className="mt-8 text-right">
            <p className="text-xl text-pink-600 font-medium" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Forever yours,
            </p>
            <p className="text-2xl text-pink-700 font-bold mt-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Your Loving Boyfriend 💕
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 text-6xl">
          🌹💖🎂🎉💕
        </div>
      </div>
    </div>
  );
};

export default FinalMessage;
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  // Using a beautiful couple image from Pexels
  const imageUrl = 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800';

  useEffect(() => {
    if (!imageContainerRef.current) return;

    const pieces = imageContainerRef.current.querySelectorAll('.image-piece');
    
    // Initial positions - spread to corners
    gsap.set(pieces[0], { x: -200, y: -200, rotation: -15 }); // Top-left
    gsap.set(pieces[1], { x: 200, y: -200, rotation: 15 });   // Top-right
    gsap.set(pieces[2], { x: -200, y: 200, rotation: 15 });   // Bottom-left
    gsap.set(pieces[3], { x: 200, y: 200, rotation: -15 });   // Bottom-right

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );

    // Image pieces animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: 'top 90%',
        end: 'bottom 40%',
        markers: false,
        scrub: 1,
      }
    });

    // Image pieces animation - ensure they meet at viewport center
    tl.to(pieces, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 2,
      ease: 'power2.out',
      stagger: 0.1
    })
    .to(shimmerRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.5')
    .to(shimmerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 py-20 px-4 flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div ref={titleRef} className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Our Perfect Moment
          </h2>
          <p className="text-xl text-pink-500">
            Watch our love come together piece by piece 💕
          </p>
        </div>

        <div className="relative">
          <div 
            ref={imageContainerRef}
            className="relative w-80 h-80 md:w-96 md:h-96 mx-auto overflow-hidden"
          >
            {/* Top-left piece */}
            <div 
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-tl-2xl shadow-lg"
              style={{ 
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: '200% 200%',
                backgroundPosition: '0% 0%'
              }}
            />
            
            {/* Top-right piece */}
            <div 
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-tr-2xl shadow-lg"
              style={{ 
                left: '50%',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: '200% 200%',
                backgroundPosition: '100% 0%'
              }}
            />
            
            {/* Bottom-left piece */}
            <div 
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-bl-2xl shadow-lg"
              style={{ 
                top: '50%',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: '200% 200%',
                backgroundPosition: '0% 100%'
              }}
            />
            
            {/* Bottom-right piece */}
            <div 
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-br-2xl shadow-lg"
              style={{ 
                top: '50%',
                left: '50%',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: '200% 200%',
                backgroundPosition: '100% 100%'
              }}
            />

            {/* Gift box shimmer effect */}
            <div 
              ref={shimmerRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
                animation: 'shimmer 0.8s ease-out'
              }}
            >
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg text-pink-600 italic">
              "Just like these pieces come together to form a beautiful picture, 
              we come together to create something magical... 🌟"
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </section>
  );
};

export default ImageReveal;
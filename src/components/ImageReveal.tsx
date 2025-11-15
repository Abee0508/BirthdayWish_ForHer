import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  // Using a single beautiful couple image
  const imageUrl = "/images/we.jpg";

  useEffect(() => {
    if (!imageContainerRef.current) return;

    const pieces = imageContainerRef.current.querySelectorAll(".image-piece");

    // Initial positions - spread to corners
    gsap.set(pieces[0], { x: -300, y: 0, rotation: -25 }); // Top-left
    gsap.set(pieces[1], { x: 300, y: 0, rotation: 25 }); // Top-right
    gsap.set(pieces[2], { x: -300, y: 0, rotation: 25 }); // Bottom-left
    gsap.set(pieces[3], { x: 300, y: 0, rotation: -25 }); // Bottom-right

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    // Image pieces animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 70%",
        end: "bottom 50%",
        markers: false,
        scrub: 1,
      },
    });

    // Image pieces animation - ensure they meet at viewport center
    tl.to(pieces, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 2,
      ease: "power2.out",
      stagger: 0.1,
    })
      .to(
        shimmerRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(shimmerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef} // Add overflow-hidden to the parent section
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 py-12 sm:py-16 md:py-20 px-3 sm:px-4 flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div ref={titleRef} className="mb-8 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-2 sm:mb-3 md:mb-4 px-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our Perfect Moment
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-pink-500 px-2">
            Watch our love come together piece by piece 💕
          </p>
        </div>

        <div className="relative">
          <div
            ref={imageContainerRef} // Made the image container responsive
            className="relative w-full max-w-[250px] xs:max-w-[300px] sm:max-w-sm md:max-w-md mx-auto"
          >
            {/* Top-left piece */}
            <div
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-tl-2xl shadow-lg"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 0%",
              }}
            ></div>

            {/* Top-right piece */}
            <div
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-tr-2xl shadow-lg"
              style={{
                left: "50%",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "200% 200%",
                backgroundPosition: "100% 0%",
              }}
            ></div>

            {/* Bottom-left piece */}
            <div
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-bl-2xl shadow-lg"
              style={{
                top: "50%",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 100%",
              }}
            ></div>

            {/* Bottom-right piece */}
            <div
              className="image-piece absolute w-1/2 h-1/2 overflow-hidden rounded-br-2xl shadow-lg"
              style={{
                top: "50%",
                left: "50%",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "200% 200%",
                backgroundPosition: "100% 100%",
              }}
            ></div>

            {/* This is a hidden image used to set the container's aspect ratio correctly */}
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              className="w-full h-auto invisible"
            />

            {/* Gift box shimmer effect */}
            <div
              ref={shimmerRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)",
                animation: "shimmer 0.8s ease-out",
              }}
            ></div>
          </div>

          <div className="mt-6 sm:mt-8 px-2">
            <p className="text-sm xs:text-base sm:text-lg text-pink-600 italic">
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
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);

  const videos = [
    "/images/videos/khansa1.mp4",
    "/images/videos/khansa2.mp4",
    "/images/videos/khansa3.mp4",
    "/images/videos/khansa4.mp4",
    "/images/videos/khansa5.mp4",
    "/images/videos/khansa6.mp4",
    "/images/videos/khansa7.mp4",
    "/images/videos/khansa8.mp4",
    "/images/videos/khansa9.mp4",
    "/images/videos/khansa10.mp4",
    "/images/videos/khansa11.mp4",
    "/images/videos/khansa12.mp4",
  ];

  useEffect(() => {
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

    if (photosRef.current) {
      const videos = photosRef.current.children;
      gsap.fromTo(
        videos,
        { scale: 0, rotation: 10, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: photosRef.current,
            start: "top 70%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={galleryRef}
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Camera className="text-pink-500 w-8 h-8 mr-3" />
            <h2
              className="text-4xl md:text-6xl font-bold text-pink-600"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The Girl Who Owns My Heart
            </h2>
            <Heart className="text-red-500 w-8 h-8 ml-3 fill-current" />
          </div>
          <p className="text-xl text-pink-500 mt-4">
            You make every moment look beautiful without even trying 📸💕
          </p>
        </div>

        <div
          ref={photosRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 aspect-square bg-gray-200"
            >
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ display: "block" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl">💖</div>
                </div>
              </div>

              {/* Floating heart on hover */}
              <div className="absolute top-4 right-4 text-2xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                💕
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-pink-600 italic">
            "Every picture whispers how beautiful you are to me... 🌹"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
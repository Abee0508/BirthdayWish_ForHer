import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Heart } from 'lucide-react';

import zoya1 from "../../public/images/zoya1.jpeg";
import zoya2 from "../../public/images/zoya2.jpeg";
import zoya3 from "../../public/images/zoya3.jpeg";
import zoya4 from "../../public/images/zoya4.jpeg";
import zoya5 from "../../public/images/zoya5.jpeg";
import zoya6 from "../../public/images/zoya6.jpeg";
import zoya7 from "../../public/images/zoya7.jpeg";
import zoya8 from "../../public/images/zoya8.jpeg";
import zoya9 from "../../public/images/zoya9.jpeg";
import zoya10 from "../../public/images/zoya10.jpeg";
import zoya11 from "../../public/images/zoya11.jpeg";
import zoya12 from "../../public/images/zoya12.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);

  const photos = [
    zoya1,
    zoya2,
    zoya3,
    zoya4,
    zoya5,
    zoya6,
    zoya7,
    zoya8,
    zoya9,
    zoya10,
    zoya11,
    zoya12,
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
      const photos = photosRef.current.children;
      gsap.fromTo(
        photos,
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
              Our Beautiful Memories
            </h2>
            <Heart className="text-red-500 w-8 h-8 ml-3 fill-current" />
          </div>
          <p className="text-xl text-pink-500 mt-4">
            Every moment with you is picture perfect 📸💕
          </p>
        </div>

        <div
          ref={photosRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={photo}
                alt={`Memory ${index + 1}`}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
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
            "Each photo tells our love story... 🌹"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
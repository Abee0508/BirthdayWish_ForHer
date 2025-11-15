import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Gift } from 'lucide-react';

interface GiftBoxesProps {
  onComplete: () => void;
}

const GiftBoxes: React.FC<GiftBoxesProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [currentGift, setCurrentGift] = useState<string | null>(null);
  const [remainingSelections, setRemainingSelections] = useState(4);

  const gifts = [
    "My endless love and devotion for you 💖",
    "A promise to always make you smile 😊",
    "My loyalty and trust, forever yours 🤝",
    "All the adventures we'll share together 🌟",
    "My heart, which beats only for you ❤️",
    "A lifetime of beautiful memories to create 📸",
    "My commitment to love you unconditionally 💕",
    "The key to my soul, which belongs to you 🗝️"
  ];

  useEffect(() => {
    // Entrance animation for gift boxes
    if (containerRef.current) {
      const boxes = containerRef.current.querySelectorAll('.gift-box');
      gsap.fromTo(boxes,
        { scale: 0, rotation: 180, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );

      // Floating animation
      gsap.to(boxes, {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
        ease: 'power2.inOut'
      });
    }
  }, []);

  const handleBoxClick = (index: number) => {
    if (selectedBoxes.includes(index) || remainingSelections === 0) return;

    setSelectedBoxes(prev => [...prev, index]);
    setRemainingSelections(prev => prev - 1);

    // Box opening animation
    const boxElement = containerRef.current?.querySelector(`.gift-box-${index}`);
    if (boxElement) {
      gsap.to(boxElement, {
        scale: 1.2,
        rotation: 360,
        duration: 0.8,
        ease: 'back.out(1.7)',
        onComplete: () => {
          setOpenedBoxes(prev => {
            const newOpened = [...prev, index];
            // If 4 boxes are opened, trigger onComplete after 4 seconds
            if (newOpened.length === 4) {
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 4000);
            }
            return newOpened;
          });
          setCurrentGift(gifts[index]);
          gsap.to(boxElement, {
            scale: 1,
            rotation: 0,
            duration: 0.3
          });
        }
      });
    }
  };

  // Remove handleGiftClick logic so the message stays visible
  const handleGiftClick = () => {
    // Do nothing, keep the message on screen
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-purple-200 via-pink-100 to-red-100 flex flex-col items-center justify-center px-2 sm:px-4 overflow-y-auto"
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-purple-600 mb-2 sm:mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Choose Your Gifts! 🎁
        </h2>
        <p className="text-base xs:text-lg sm:text-xl text-purple-500 mb-1 sm:mb-2">
          Select 4 special gift boxes to unwrap your surprises
        </p>
        <p className="text-sm xs:text-base sm:text-lg text-purple-400">
          Remaining selections: {remainingSelections}
        </p>
      </div>

      {/* Gift Boxes Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 xs:gap-4 md:gap-6 mb-6 sm:mb-8 w-full max-w-lg sm:max-w-2xl mx-auto">
        {gifts.map((gift, index) => (
          <div
            key={index}
            className={`gift-box d-flex justify-content-center gift-box-${index} cursor-pointer transform transition-all duration-300 ${
              selectedBoxes.includes(index)
                ? "opacity-50"
                : "hover:scale-105 md:hover:scale-110"
            }`}
            onClick={() => handleBoxClick(index)}
          >
            <div
              className={`w-16 h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 rounded-lg shadow-lg flex items-center justify-center text-3xl xs:text-4xl ${
                openedBoxes.includes(index)
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                  : "bg-gradient-to-br from-pink-500 to-purple-600"
              }`}
            >
              {openedBoxes.includes(index) ? "✨" : "🎁"}
            </div>
          </div>
        ))}
      </div>

      {/* Current Gift Display */}
      {currentGift && (
        <div className="current-gift bg-white/90 backdrop-blur-sm rounded-2xl p-4 xs:p-6 shadow-xl max-w-xs xs:max-w-md text-center mt-2 xs:mt-4">
          <div className="text-xl xs:text-2xl mb-1 xs:mb-2">🎁</div>
          <p className="text-base xs:text-lg text-purple-700 font-medium">
            {currentGift}
          </p>
          <p className="text-xs xs:text-sm text-purple-500 mt-1 xs:mt-2">
            This gift is yours forever! ✨
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 w-full text-center px-2">
        <p className="text-xs xs:text-sm sm:text-base text-purple-600">
          Click on the gift boxes to open them and reveal your special
          surprises! 💖
        </p>
      </div>
    </div>
  );
};

export default GiftBoxes;
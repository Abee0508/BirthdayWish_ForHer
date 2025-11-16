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
  const [remainingSelections, setRemainingSelections] = useState(2);

  const gifts = [
    "My endless love and devotion for you 💖",
    "A promise to always make you smile 😊",
  ];

  useEffect(() => {
    // Entrance animation for gift boxes
    if (containerRef.current) {
      const boxes = containerRef.current.querySelectorAll(".gift-box");
      gsap.fromTo(
        boxes,
        { scale: 0, rotation: 180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );

      // Floating animation
      gsap.to(boxes, {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
        ease: "power2.inOut",
      });
    }
  }, []);

  const handleBoxClick = (index: number) => {
    if (selectedBoxes.includes(index) || remainingSelections === 0) return;

    setSelectedBoxes((prev) => [...prev, index]);
    setRemainingSelections((prev) => prev - 1);

    // Box opening animation
    const boxElement = containerRef.current?.querySelector(
      `.gift-box-${index}`
    );
    if (boxElement) {
      gsap.to(boxElement, {
        scale: 1.2,
        rotation: 360,
        duration: 0.8,
        ease: "back.out(1.7)",
        onComplete: () => {
          setOpenedBoxes((prev) => {
            const newOpened = [...prev, index];
            return newOpened;
          });
          setCurrentGift(gifts[index]);
          gsap.to(boxElement, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
        },
      });
    }

    // (moved) Call onComplete after openedBoxes updates (avoid updating parent during render)
  };

  // Remove handleGiftClick logic so the message stays visible
  const handleGiftClick = () => {
    // Do nothing, keep the message on screen
  };

  // Call onComplete after openedBoxes updates (avoid updating parent during render)
  useEffect(() => {
    if (openedBoxes.length === 2) {
      if (onComplete) onComplete();
    }
  }, [openedBoxes, onComplete]);

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
      </div>

      {/* Gift Boxes Grid */}
      <div className="grid grid-cols-2 gap-4 xs:gap-6 md:gap-8 mb-6 sm:mb-8 w-full max-w-sm sm:max-w-lg mx-auto justify-items-center">
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
              className={`w-20 h-20 xs:w-24 xs:h-24 md:w-28 md:h-28 rounded-lg shadow-lg flex items-center justify-center text-4xl xs:text-5xl ${
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
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 to-red-600 text-white py-8 sm:py-10 md:py-12">
      <div className="max-w-4xl mx-auto text-center px-3 sm:px-4">
        <div className="mb-4 sm:mb-5 md:mb-6">
          <Heart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 fill-current text-pink-200" />
          <h3
            className="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 sm:mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Happy Birthday, My Love!
          </h3>
          <p className="text-base xs:text-lg sm:text-xl text-pink-100">
            You are the most precious gift in my life 🎁
          </p>
        </div>

        <div className="text-sm xs:text-base sm:text-lg text-pink-100 leading-relaxed max-w-2xl mx-auto">
          <p className="mb-3 sm:mb-4">
            "Every day with you feels like a celebration, but today is extra
            special because it's the day the world was blessed with your
            beautiful soul. 💖"
          </p>
          <p className="mb-4 sm:mb-6">
            "I love you more than words can express, more than the ocean is
            deep, and more than the universe is vast. Happy Birthday, my
            everything! 🌹✨"
          </p>
        </div>

        <div className="border-t border-pink-400/30 pt-4 sm:pt-5 md:pt-6 mt-6 sm:mt-7 md:mt-8">
          <p className="text-xs xs:text-sm sm:text-base text-pink-200">
            Made with 💖 by Taha
          </p>
          <div className="mt-2 text-2xl xs:text-3xl sm:text-4xl">
            🎂🎉💕🌹🎈
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
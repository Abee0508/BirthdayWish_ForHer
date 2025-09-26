import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 to-red-600 text-white py-12">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="mb-6">
          <Heart className="w-12 h-12 mx-auto mb-4 fill-current text-pink-200" />
          <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Happy Birthday, My Love! 
          </h3>
          <p className="text-xl text-pink-100">
            You are the most precious gift in my life 🎁
          </p>
        </div>
        
        <div className="text-lg text-pink-100 leading-relaxed max-w-2xl mx-auto">
          <p className="mb-4">
            "Every day with you feels like a celebration, but today is extra special because it's the day 
            the world was blessed with your beautiful soul. 💖"
          </p>
          <p className="mb-6">
            "I love you more than words can express, more than the ocean is deep, 
            and more than the universe is vast. Happy Birthday, my everything! 🌹✨"
          </p>
        </div>

        <div className="border-t border-pink-400/30 pt-6 mt-8">
          <p className="text-pink-200">
            Made with 💖 by someone who loves you to the moon and back
          </p>
          <div className="mt-2 text-4xl">
            🎂🎉💕🌹🎈
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
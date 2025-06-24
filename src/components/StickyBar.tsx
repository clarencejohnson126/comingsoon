import React, { useState, useEffect } from 'react';

interface StickyBarProps {
  onJoinClick: () => void;
}

const StickyBar: React.FC<StickyBarProps> = ({ onJoinClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Wait for scroll to complete, then trigger join
    setTimeout(() => {
      onJoinClick();
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-orange-500/30 p-4 z-50 transform transition-transform duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="text-white">
          <span className="font-bold shimmer-orange">Don't miss the Rebelz AI Blacklist.</span>
          <span className="text-orange-500 ml-2">Join Now</span>
        </div>
        <button 
          onClick={handleSmoothScrollToTop}
          className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 pulse-orange"
        >
          Join Rebelz AI Blacklist
        </button>
      </div>
    </div>
  );
};

export default StickyBar;
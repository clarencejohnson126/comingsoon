import React, { useState } from 'react';
import { Coffee, Code, Heart, X } from 'lucide-react';
import MatrixRain from './MatrixRain';

const FounderNote: React.FC = () => {
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const closeModal = () => {
    setShowImageModal(false);
  };

  return (
    <>
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <MatrixRain intensity="subtle" className="opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="bg-black/50 backdrop-blur-md rounded-3xl p-12 border border-orange-500/30 hover-glow">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//out-2-1.png"
                  alt="Clarence - Founder"
                  className="w-48 h-48 rounded-full border-4 border-orange-500/50 cursor-pointer hover:border-orange-500 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                  onClick={handleImageClick}
                  title="Click to view larger image"
                />
              </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-6 shimmer-orange">
                A message from the founder
              </h3>
              
              <blockquote className="text-lg text-gray-300 font-mono leading-relaxed mb-6">
                "I built Rebelz AI because tech is more than just work - it's a mindset, a culture, a way of seeing the world. 
                We deserve clothing that reflects our values: innovation, rebellion against the status quo, and the belief 
                that code can change everything.
                <br /><br />
                This isn't just another streetwear brand. This is armor for the digital revolution."
              </blockquote>
              
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <Coffee className="w-5 h-5 text-orange-500" />
                <Code className="w-5 h-5 text-orange-500" />
                <Heart className="w-5 h-5 text-orange-500" />
              </div>
              
              <footer className="font-bold">
                <span className="shimmer-orange text-xl">Clarence</span>
                <br />
                <span className="text-orange-300 font-mono text-sm">Founder & Chief Rebel</span>
              </footer>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-orange-500/30 text-center">
            <p className="text-orange-400 font-mono">
              Ready to deploy your style? Join the movement.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Image Modal */}
    {showImageModal && (
      <div 
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={closeModal}
      >
        <div className="relative max-w-2xl max-h-screen">
          <button
            onClick={closeModal}
            className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors duration-300"
            title="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//out-2-1.png"
            alt="Clarence - Founder (Full Size)"
            className="max-w-full max-h-screen rounded-2xl border-4 border-orange-500/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    )}
  </>
  );
};

export default FounderNote;
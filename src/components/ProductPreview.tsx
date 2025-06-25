import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Code2, Cpu, X, ZoomIn } from 'lucide-react';
import MatrixRain from './MatrixRain';

const ProductPreview: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  
  const products = [
    {
      id: 1,
      name: "The Trifecta Hoodie",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2026,%202025,%2012_36_02%20AM.png",
      description: "Embedded Code inside sleeve for retrieving community perks",
      price: "$/€/BTC/ETH/SOL/USDT",
      features: ["French Terry Fabric", "GSM 350 brushed", "Embroided Label Tag at bottom back \"First Mover Collection\"", "Limited Edition"]
    },
    {
      id: 2,
      name: "Fitted and Automated Tee",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2026,%202025,%2012_49_38%20AM.png",
      description: "Obey nobody. Automate everything",
      price: "$/€/BTC/ETH/SOL/USDT",
      features: ["Custom Code", "Organic Cotton", "Embroided Label tag at bottom left front \"Verified Vibe Coder\""]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const openEnlargedImage = (imageUrl: string) => {
    setEnlargedImage(imageUrl);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && enlargedImage) {
        closeEnlargedImage();
      }
    };

    if (enlargedImage) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [enlargedImage]);

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
      <MatrixRain intensity="subtle" className="opacity-50" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 shimmer-orange">
            PRODUCT PREVIEW
          </h2>
          <p className="text-xl text-orange-300 font-mono">
            Sneak peek at what's compiling in our design lab
          </p>
        </div>

        <div className="relative">
          <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border border-orange-500/30 hover-glow">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group cursor-pointer" onClick={() => openEnlargedImage(products[currentSlide].preview)}>
                <img
                  src={products[currentSlide].preview}
                  alt={products[currentSlide].name}
                  className="w-full h-96 object-cover rounded-2xl border-2 border-orange-500/50 transition-all duration-300 group-hover:brightness-75"
                />
                
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-2xl">
                  <div className="bg-orange-500 rounded-full p-3">
                    <ZoomIn className="w-8 h-8 text-black" />
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 bg-orange-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                  EXCLUSIVE
                </div>
                
                {/* Click to enlarge hint */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-orange-400 px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-4 shimmer-orange">
                  {products[currentSlide].name}
                </h3>
                <p className="text-lg text-gray-300 font-mono mb-6">
                  {products[currentSlide].description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold shimmer-orange">
                      {products[currentSlide].price}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {products[currentSlide].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-300 font-mono">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Reserve This Drop
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md rounded-full p-3 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-orange-500" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md rounded-full p-3 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-orange-500" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-orange-500' : 'bg-orange-500/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeEnlargedImage}
          />
          
          {/* Modal Content */}
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={closeEnlargedImage}
              className="absolute -top-12 right-0 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md rounded-full p-3 transition-all duration-300 z-10"
            >
              <X className="w-6 h-6 text-orange-500" />
            </button>
            
            {/* Enlarged Image */}
            <img
              src={enlargedImage}
              alt="Enlarged product view"
              className="w-full h-full object-contain rounded-2xl border-2 border-orange-500/50 shadow-2xl"
            />
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-orange-400 px-4 py-2 rounded-lg text-sm font-mono">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductPreview;
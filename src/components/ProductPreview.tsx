import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Code2, Cpu, X, ZoomIn } from 'lucide-react';
import MatrixRain from './MatrixRain';

interface ProductPreviewProps {
  onReserve?: () => void;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ onReserve }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  
  const products = [
    {
      id: 1,
      name: "The Trifecta Hoodie",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2026,%202025,%2012_36_02%20AM.png",
      description: "Embedded Code inside sleeve for retrieving community perks",
      price: "Blacklist = Priority",
      features: ["French Terry Fabric", "GSM 350 brushed", "Embroided Label Tag at bottom back \"First Mover Collection\"", "Limited Edition"]
    },
    {
      id: 2,
      name: "Fitted and Automated Tee",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2026,%202025,%2012_49_38%20AM.png",
      description: "Obey nobody. Automate everything",
      price: "Blacklist = Priority",
      features: ["Custom Code", "Organic Cotton", "Embroided Label tag at bottom left front \"Verified Vibe Coder\""]
    },
    {
      id: 3,
      name: "Neural Network Oversized Hoodie",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//f87b2ace-87fa-471d-b112-4b7c4a21b067%20(1)%20(1).jpeg",
      description: "When your code thinks for itself",
      price: "Blacklist = Priority",
      features: ["480 GSM heavyweight cotton", "Neural network print design", "Oversized streetwear fit", "Hidden tech pocket", "Glow-in-the-dark accents"]
    },
    {
      id: 4,
      name: "Binary Beast Crewneck",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//263b7ec4-60c4-40e5-b999-0b145a272d3e.png",
      description: "01001000 01101001 - Decode the message",
      price: "Blacklist = Priority",
      features: ["Premium cotton blend", "Binary code pattern", "Ribbed cuffs and hem", "Machine washable", "Unisex sizing"]
    },
    {
      id: 5,
      name: "Digital Focus Workspace Tee",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//Arbeiten%20im%20digitalen%20Fokus.png",
      description: "Working in digital focus - where innovation happens",
      price: "Blacklist = Priority",
      features: ["Ultra-soft organic cotton", "German-inspired design", "Anti-static fabric", "Breathable mesh panels", "Productivity mantra print"]
    },
    {
      id: 6,
      name: "AI Generated Classic",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//ChatGPT%20Image%20Jun%2026,%202025,%2012_36_33%20AM.png",
      description: "Designed by algorithms, worn by rebels",
      price: "Blacklist = Priority",
      features: ["AI-optimized color scheme", "Sustainable fabric blend", "Seamless construction", "Quick-dry technology", "Future-proof design"]
    },
    {
      id: 7,
      name: "Stack Overflow Sweatshirt",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//eda3ed3f-fb5d-463d-a186-0172e21ba45c.png",
      description: "When your wardrobe throws exceptions",
      price: "Blacklist = Priority",
      features: ["Exception-proof stitching", "Memory-efficient pockets", "Compiler-tested durability", "Stack-safe design", "Debug-friendly labels"]
    },
    {
      id: 8,
      name: "Terminal Interface Hoodie",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/images//Screenshot%202025-06-28%20at%2002.24.56.png",
      description: "sudo wear style",
      price: "Blacklist = Priority",
      features: ["Command-line inspired print", "Root access comfort", "Terminal green accents", "Bash-compatible fit", "Escape key pull tab"]
    },
    {
      id: 9,
      name: "Runtime Revolution Tee",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//08cf55f5-ae3b-42a8-aad9-e67a90207149.png",
      description: "Executes flawlessly in any environment",
      price: "Blacklist = Priority",
      features: ["Cross-platform compatibility", "Optimized performance fabric", "Runtime-tested comfort", "Memory leak resistant", "Zero downtime durability"]
    },
    {
      id: 10,
      name: "Code Repository Varsity",
      preview: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/images//Screenshot%202025-06-28%20at%2002.22.18.png",
      description: "git commit -m 'added style to wardrobe'",
      price: "Blacklist = Priority",
      features: ["Version-controlled design", "Branch-resistant fabric", "Merge conflict free", "Pull request ready", "Open source inspired"]
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
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 shimmer-orange">
            PRODUCT PREVIEW
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-300 font-mono px-4">
            Sneak peek at what's compiling in our design lab
          </p>
        </div>

        <div className="relative">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-orange-500/30 hover-glow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="relative group cursor-pointer" onClick={() => openEnlargedImage(products[currentSlide].preview)}>
                <img
                  src={products[currentSlide].preview}
                  alt={products[currentSlide].name}
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover rounded-xl sm:rounded-2xl border-2 border-orange-500/50 transition-all duration-300 group-hover:brightness-75"
                />
                
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-xl sm:rounded-2xl">
                  <div className="bg-orange-500 rounded-full p-2 sm:p-3">
                    <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                </div>
                
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-orange-500 text-black px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
                  EXCLUSIVE
                </div>
                
                {/* Click to enlarge hint */}
                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/70 backdrop-blur-sm text-orange-400 px-2 py-1 rounded text-[10px] sm:text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 shimmer-orange">
                  {products[currentSlide].name}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 font-mono mb-4 sm:mb-6">
                  {products[currentSlide].description}
                </p>
                
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                    <span className="text-lg sm:text-xl md:text-2xl font-bold shimmer-orange">
                      {products[currentSlide].price}
                    </span>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    {products[currentSlide].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-orange-300 font-mono text-xs sm:text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={onReserve}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Reserve This Drop
                </button>
              </div>
            </div>
          </div>

          {/* Navigation - Mobile responsive */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500" />
          </button>

          {/* Dots indicator - Mobile responsive */}
          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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
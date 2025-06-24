import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Code2, Cpu } from 'lucide-react';
import MatrixRain from './MatrixRain';

const ProductPreview: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const products = [
    {
      id: 1,
      name: "Neural Network Hoodie",
      preview: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
      description: "Embedded circuits pattern with reactive fiber technology",
      price: "0x47 ETH",
      features: ["Smart Fabric", "Temperature Adaptive", "Limited Edition"]
    },
    {
      id: 2,
      name: "Binary Code Tee",
      preview: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      description: "Your personal algorithm printed in binary",
      price: "0x23 ETH",
      features: ["Custom Code", "Organic Cotton", "Glow-in-Dark"]
    },
    {
      id: 3,
      name: "Quantum Sneakers",
      preview: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
      description: "Step into the future with quantum-inspired design",
      price: "0x89 ETH",
      features: ["LED Soles", "Anti-Gravity Foam", "Blockchain Auth"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

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
              <div className="relative">
                <img
                  src={products[currentSlide].preview}
                  alt={products[currentSlide].name}
                  className="w-full h-96 object-cover rounded-2xl border-2 border-orange-500/50"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                  EXCLUSIVE
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
    </section>
  );
};

export default ProductPreview;
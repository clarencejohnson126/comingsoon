import React, { useState } from 'react';
import { Quote, Github, Twitter, Linkedin, X } from 'lucide-react';
import MatrixRain from './MatrixRain';

const TestimonialSection: React.FC = () => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const testimonials = [
    {
      quote: "Finally, a brand that speaks my language. Literally wearing my favorite algorithm with Rebelz AI right now.",
      author: "@PromptSamurai",
      role: "Full Stack Rebel",
      avatar: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//Screenshot%202025-06-29%20at%2019.30.45.png",
      platform: <Github className="w-4 h-4" />
    },
    {
      quote: "Streetwear for my inner AI. The Rebelz AI Neural Network hoodie literally reads my mind.",
      author: "@NerdModeOn",
      role: "AI Engineer",
      avatar: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//Screenshot%202025-06-29%20at%2019.31.13.png",
      platform: <Twitter className="w-4 h-4" />
    },
    {
      quote: "This isn't just clothing - it's a statement. Every Rebelz AI piece tells the story of digital rebellion.",
      author: "@CodeNinja42",
      role: "Blockchain Developer",
      avatar: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//Screenshot%202025-06-29%20at%2019.31.26.png",
      platform: <Linkedin className="w-4 h-4" />
    },
    {
      quote: "Been waiting for something like Rebelz AI forever. Fashion that actually understands tech culture.",
      author: "@ByteQueen",
      role: "DevOps Architect",
      avatar: "https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/public/test//Screenshot%202025-06-29%20at%2019.30.58.png",
      platform: <Github className="w-4 h-4" />
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
      <MatrixRain intensity="subtle" className="opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 shimmer-orange">
            console.log(rebelzAI.reviews)
          </h2>
          <p className="text-xl text-orange-300 font-mono">
            What the underground is saying about Rebelz AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover-glow relative"
            >
              <Quote className="w-8 h-8 text-orange-500/50 absolute top-4 right-4" />
              
              <blockquote className="text-lg text-gray-300 font-mono mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full border-2 border-orange-500/50 cursor-pointer hover:border-orange-500 transition-all duration-300 hover:scale-105"
                  onClick={() => setEnlargedImage(testimonial.avatar)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold shimmer-orange">{testimonial.author}</h4>
                    <div className="text-orange-500/70">
                      {testimonial.platform}
                    </div>
                  </div>
                  <p className="text-orange-300/70 text-sm font-mono">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {enlargedImage && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEnlargedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <button
                onClick={() => setEnlargedImage(null)}
                className="absolute top-4 right-4 z-60 bg-orange-500/20 hover:bg-orange-500/40 text-white p-2 rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={enlargedImage}
                alt="Enlarged testimonial image"
                className="max-w-full max-h-full object-contain rounded-lg border-2 border-orange-500/50"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialSection;
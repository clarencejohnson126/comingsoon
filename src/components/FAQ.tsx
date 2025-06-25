import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import MatrixRain from './MatrixRain';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes Rebelz AI different from other streetwear brands?",
      answer: "We're the first brand built specifically for developers and tech professionals. Every design incorporates actual code, algorithms, and tech concepts. Plus, each item comes with blockchain verification and community voting rights."
    },
    {
      question: "How does the Blacklist work?",
      answer: "The Blacklist gives you early access to limited drops before they go public. Blacklist members get exclusive designs, pricing discounts, and voting power on future collections. Only 150 spots per drop cycle."
    },
    {
      question: "Are the clothes actually smart/connected?",
      answer: "Selected pieces feature IoT connectivity, LED elements, and responsive fabrics. Our Neural Network hoodie can actually display different patterns based on your environment and mood via a mobile app."
    },
    {
      question: "What programming languages do you support?",
      answer: "All of them! From Python and JavaScript to Rust and Go. You can even request custom code prints in your favorite language or framework. We speak fluent syntax."
    },
    {
      question: "How does blockchain verification work?",
      answer: "Each authentic Rebelz AI item comes with an NFT certificate of authenticity. This prevents counterfeiting and gives you provable ownership of limited edition pieces."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship to our global network of rebelz in over 50 countries. Shipping is carbon-neutral and tracked via our custom logistics algorithm."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-black">
      <MatrixRain intensity="subtle" className="opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 shimmer-orange">
            FAQ.resolve()
          </h2>
          <p className="text-xl text-orange-300 font-mono">
            Debug your questions here
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-black/50 backdrop-blur-md rounded-2xl border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-bold shimmer-orange pr-4">
                  {faq.question}
                </h3>
                <div className="text-orange-500 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-orange-500/30 pt-4">
                    <p className="text-gray-300 font-mono leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-orange-500" />
            <span className="text-orange-400 font-mono">Still have questions?</span>
          </div>
          <p className="text-gray-400 font-mono">
            Email us at{' '}
                            <a href="mailto:thinkbig@rebelz-ai.com" className="text-orange-500 hover:text-orange-400 transition-colors">
                  thinkbig@rebelz-ai.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
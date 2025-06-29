import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import MatrixRain from './MatrixRain';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why should I care about another 'tech' clothing brand?",
      answer: "I mean, you shouldn't unless you're tired of wearing plain hoodies while debugging until 3am. I just make clothes for people who think in code. No revolutionary claims here, just shirts that get it."
    },
    {
      question: "What's this blacklist thing about?",
      answer: "I drop stuff in small batches. Get on the list, you see it first. Don't, and you'll probably still find something decent elsewhere. I'm not running a secret society, just keeping things manageable."
    },
    {
      question: "Are your clothes actually 'smart' or is that marketing BS?",
      answer: "Good question and the answer is yes and no. First of all they're just clothes. Some have cool prints of algorithms and code snippets. But the catch are the NFC Tags that reveal for every buyer some cool perks, nothing fancy and expensive but makes the brand stand out as an Collectable. I'm not putting WiFi in your t-shirt. That would be weird and unnecessary."
    },
    {
      question: "What programming languages do you rep?",
      answer: "Whatever doesn't make me cringe. Depends on the Task at hand but in general TypeScript or Go now, Next.JS, Supabase, React Native for Mobile and MCP Integrations wherever available and secure. I'm not judging your stack choices (much)."
    },
    {
      question: "Do you ship worldwide?",
      answer: "I ship where the postal service doesn't lose packages. But to be honest I'm trying to ship everywhere. Right now I'm shipping out of Mannheim, Germany after I received the merch from my asian supplier (doesn't get realer than that. Weekly bleeps in my hustle coming soon). That's why always consider extra shipping Fee when you order out of Germany/Europe. But true support finds no boundaries, we will find a way to get your piece shipped to you."
    },
    {
      question: "How do I wash these without destroying them?",
      answer: "Good question since I actually care about quality. The French terry hoodie (80% cotton, 20% polyester, 350 gsm) - wash cold, inside out, hang dry. Don't put it in the dryer unless you want a crop top. The organic cotton tees (100% cotton, 220 gsm) are pretty chill - cold wash, low heat dry if you must. These are the first two pieces I'm dropping. Vests, tech trousers, hats and more coming in the pipeline, but let's not get ahead of ourselves."
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
            Your questions, my honest answers
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
            <span className="text-orange-400 font-mono">Still confused?</span>
          </div>
          <p className="text-gray-400 font-mono">
            Hit me up at{' '}
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
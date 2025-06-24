import React from 'react';
import { Zap, Shield, Users, Globe, Code, Cpu } from 'lucide-react';
import MatrixRain from './MatrixRain';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code-First Design",
      description: "Every piece tells a story in syntax. Wear your programming language with pride.",
      code: "style.apply(rebellion)"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Verified",
      description: "Each item comes with NFT authenticity. No fakes, no compromises.",
      code: "verify.authenticity()"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Designs voted by developers, for developers. Democracy through code.",
      code: "community.decide()"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Underground",
      description: "Ship worldwide to our distributed network of rebels and creators.",
      code: "deploy.globally()"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Wearables",
      description: "IoT-enabled clothing that responds to your environment and mood.",
      code: "fabric.connect()"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI-Generated",
      description: "Patterns created by neural networks trained on thousands of designs.",
      code: "ai.create.unique()"
    }
  ];

  return (
    <section className="relative py-20 bg-black">
      <MatrixRain intensity="subtle" className="opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 shimmer-orange">
            system.features()
          </h2>
          <p className="text-xl text-orange-300 font-mono max-w-3xl mx-auto">
            Built by developers, for developers. Every feature engineered for maximum impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover-glow group"
            >
              <div className="text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 shimmer-orange">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="bg-gray-900/50 rounded-lg p-4 border border-orange-500/20">
                <code className="text-orange-400 font-mono text-sm">
                  {feature.code}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Showcase */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8 shimmer-orange">
            Powered by cutting-edge tech
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {['React', 'TypeScript', 'Web3', 'AI/ML', 'IoT', 'Blockchain', 'Smart Contracts', 'Neural Networks'].map((tech, index) => (
              <div 
                key={index}
                className="bg-orange-500/10 backdrop-blur-md rounded-full px-6 py-3 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300"
              >
                <span className="text-orange-400 font-mono font-bold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
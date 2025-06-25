import React from 'react';
import { Users, Globe, Code, Star, Handshake, Crown } from 'lucide-react';
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
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Designs voted by developers, for developers. Democracy through code.",
      code: "community.decide()"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Underground",
      description: "Ship worldwide to our distributed network of rebelz and creators.",
      code: "deploy.globally()"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Early Access Program",
      description: "Subscribers and early supporters get first dibs on new drops, exclusive access to unreleased designs, and private beta invites for new features.",
      code: "access.early()"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Direct-to-Creator Collabs",
      description: "We collaborate with underground devs, hackers, and artists. Own pieces made with creators from our global community—no gatekeepers.",
      code: "collab.join()"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Lifetime Discount for Founders",
      description: "OG customers who support us early get a lifetime discount code. Thank you for believing before the hype train arrives.",
      code: "reward.founder()"
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


      </div>
    </section>
  );
};

export default FeatureSection;
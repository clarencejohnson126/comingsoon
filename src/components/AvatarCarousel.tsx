import React from 'react';

const AvatarCarousel: React.FC = () => {
  // Generate diverse avatar URLs from a service that provides AI-generated faces
  const avatars = Array.from({ length: 12 }, (_, i) => 
    `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=100&h=100&fit=crop&crop=face&auto=format`
  );

  return (
    <div className="overflow-hidden py-8">
      <p className="text-center text-white mb-6 text-lg">See who's already Blacklisted with <span className="shimmer-orange font-bold">Rebelz AI</span></p>
      <div className="flex animate-scroll space-x-4">
        {[...avatars, ...avatars].map((avatar, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-orange-500/50 overflow-hidden hover:border-orange-500 transition-all duration-300"
          >
            <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-orange-500/40 flex items-center justify-center text-orange-500 font-bold">
              {String.fromCharCode(65 + (index % 26))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarCarousel;
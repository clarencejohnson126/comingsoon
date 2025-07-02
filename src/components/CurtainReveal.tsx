import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

interface CurtainRevealProps {
  onRevealComplete: () => void;
  onGetBlacklisted: () => void;
  heroImage: string;
  mobileHeroImage: string;
  children: React.ReactNode;
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({ 
  onRevealComplete, 
  onGetBlacklisted,
  heroImage,
  mobileHeroImage, 
  children 
}) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const scrollMotionValue = useMotionValue(0);
  const lastTouchY = useRef(0);

  // Live ticker text
  const tickerTexts = [
    "🔥 Limited Drop Coming Soon",
    "💻 Code Meets Streetwear",
    "⚡ Join 2.7k+ Developers",
    "🎯 First Mover Collection",
    "🚀 Deploy Yourself"
  ];
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);

  // Ticker animation
  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % tickerTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isComplete, tickerTexts.length]);

  // Handle scroll events
  useEffect(() => {
    if (isComplete) return;

    const handleScroll = (e: Event) => {
      e.preventDefault();
      
      if (!isRevealing) {
        setIsRevealing(true);
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Determine scroll direction
      let scrollDirection = 0;
      if (e.type === 'wheel') {
        scrollDirection = (e as WheelEvent).deltaY > 0 ? 1 : -1;
      } else if (e.type === 'touchmove') {
        const touch = (e as TouchEvent).touches[0];
        const deltaY = lastTouchY.current - touch.clientY;
        scrollDirection = deltaY > 0 ? 1 : -1;
        lastTouchY.current = touch.clientY;
      }

      // Update scroll progress (0 to 1) - bidirectional with faster speed
      const newProgress = Math.max(0, Math.min(scrollProgress + (scrollDirection * 0.008), 1));
      setScrollProgress(newProgress);
      scrollMotionValue.set(newProgress);

      // Complete reveal immediately when progress reaches 1
      if (newProgress >= 1) {
        setIsComplete(true);
        onRevealComplete();
        // Re-enable normal scrolling immediately
        document.body.style.overflow = 'unset';
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchmove', handleScroll);
        window.removeEventListener('touchstart', handleTouchStart);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    // Disable scrolling initially
    document.body.style.overflow = 'hidden';

    // Add scroll listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isRevealing, scrollProgress, isComplete, onRevealComplete]);

  // Animation values
  const curtainTop = useTransform(scrollMotionValue, [0, 1], ['0%', '-50%']);
  const curtainBottom = useTransform(scrollMotionValue, [0, 1], ['0%', '50%']);
  const overlayOpacity = useTransform(scrollMotionValue, [0, 0.8], [1, 0]);
  const logoScale = useTransform(scrollMotionValue, [0, 1], [1, 0.8]);

  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="curtain-reveal-container">
      {/* Hero Image Background - Responsive */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: 9998 }}>
        {/* Mobile Hero Image */}
        <img
          src={mobileHeroImage}
          alt="Rebelz AI Mobile Hero"
          loading="eager"
          fetchPriority="high"
          width="800"
          height="1200"
          className="block md:hidden w-full h-full object-cover"
        />
        {/* Desktop Hero Image */}
        <img
          src={heroImage}
          alt="Rebelz AI Desktop Hero"
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
          className="hidden md:block w-full h-full object-cover"
        />
      </div>

      {/* Left Curtain */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-black"
        style={{
          clipPath: `polygon(0 0, ${50 - (scrollProgress * 50)}% 0, ${50 - (scrollProgress * 50)}% 100%, 0 100%)`
        }}
      >
        {/* Left Curtain Content */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: overlayOpacity }}
        >
          {/* Logo */}
          <motion.div
            style={{ scale: logoScale }}
            className="mb-8"
          >
            <div className="text-4xl md:text-6xl font-bold text-orange-500 mb-2">
              🔥 REBELZ AI 🔥
            </div>
          </motion.div>

          {/* Slogan */}
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 max-w-4xl leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Rep your Stack
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl text-orange-400 mb-8 font-mono"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Merch for Coders with AI & Guts
          </motion.p>

          {/* Live Ticker */}
          <motion.div 
            className="mb-8 h-8 flex items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTickerIndex}
                className="text-orange-300 font-mono text-sm md:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {tickerTexts[currentTickerIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Get Blacklisted Button */}
          <motion.button
            onClick={onGetBlacklisted}
            className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 pulse-orange border-2 border-orange-400 text-black"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock className="w-5 h-5" />
            Get Blacklisted
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Scroll Hint */}
          {!isRevealing && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
                             <div className="text-orange-400 font-mono text-sm mb-2">Scroll to open/close curtain</div>
              <motion.div
                className="w-1 h-8 bg-orange-500 mx-auto rounded-full"
                animate={{ 
                  scaleY: [1, 0.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}

          {/* Progress indicator during reveal */}
          {isRevealing && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
                             <div className="text-orange-400 font-mono text-sm mb-2">
                 {Math.round(scrollProgress * 100)}% open
               </div>
              <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-orange-500"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

                    {/* Right Curtain */}
       <motion.div
         className="fixed inset-0 z-[9999] bg-black"
         style={{
           clipPath: `polygon(${50 + (scrollProgress * 50)}% 0, 100% 0, 100% 100%, ${50 + (scrollProgress * 50)}% 100%)`
         }}
       >
         {/* Right Curtain Content */}
         <motion.div 
           className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
           style={{ opacity: overlayOpacity }}
         >
           {/* Logo */}
           <motion.div
             style={{ scale: logoScale }}
             className="mb-8"
           >
             <div className="text-4xl md:text-6xl font-bold text-orange-500 mb-2">
               🔥 REBELZ AI 🔥
             </div>
           </motion.div>

           {/* Slogan */}
           <motion.h1 
             className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 max-w-4xl leading-tight"
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.8 }}
           >
             Rep your Stack
           </motion.h1>
           
           <motion.p 
             className="text-lg md:text-2xl text-orange-400 mb-8 font-mono"
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 0.8 }}
           >
             Merch for Coders with AI & Guts
           </motion.p>

           {/* Live Ticker */}
           <motion.div 
             className="mb-8 h-8 flex items-center"
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.7, duration: 0.8 }}
           >
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentTickerIndex}
                 className="text-orange-300 font-mono text-sm md:text-base"
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ y: -20, opacity: 0 }}
                 transition={{ duration: 0.5 }}
               >
                 {tickerTexts[currentTickerIndex]}
               </motion.div>
             </AnimatePresence>
           </motion.div>

           {/* Get Blacklisted Button */}
           <motion.button
             onClick={onGetBlacklisted}
             className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 pulse-orange border-2 border-orange-400 text-black"
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.9, duration: 0.8 }}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
           >
             <Lock className="w-5 h-5" />
             Get Blacklisted
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </motion.button>

           {/* Scroll Instructions */}
           {!isRevealing && (
             <motion.div
               className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.5, duration: 1 }}
             >
               <div className="text-orange-400 font-mono text-sm mb-2">Scroll to open/close curtain</div>
               <motion.div
                 className="w-1 h-8 bg-orange-500 mx-auto rounded-full"
                 animate={{ 
                   scaleY: [1, 0.5, 1],
                   opacity: [1, 0.5, 1]
                 }}
                 transition={{ 
                   duration: 1.5, 
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               />
             </motion.div>
           )}

           {/* Progress indicator during reveal */}
           {isRevealing && (
             <motion.div
               className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
             >
               <div className="text-orange-400 font-mono text-sm mb-2">
                 {Math.round(scrollProgress * 100)}% open
               </div>
               <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                 <motion.div
                   className="h-full bg-orange-500"
                   style={{ width: `${scrollProgress * 100}%` }}
                 />
               </div>
             </motion.div>
           )}


         </motion.div>
       </motion.div>
    </div>
  );
};

export default CurtainReveal; 
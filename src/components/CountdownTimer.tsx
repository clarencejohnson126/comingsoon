import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 40,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Get or set target date from localStorage to persist across reloads
    let targetDate: Date;
    
    const storedTargetDate = localStorage.getItem('rebelzAITargetDate');
    
    if (storedTargetDate) {
      // Use existing target date
      targetDate = new Date(storedTargetDate);
    } else {
      // Create new target date: exactly 40 days from now
      const now = new Date();
      targetDate = new Date(now.getTime() + (40 * 24 * 60 * 60 * 1000)); // 40 days in milliseconds
      localStorage.setItem('rebelzAITargetDate', targetDate.toISOString());
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateTimer();

    // Then update every second
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div className="bg-black/90 backdrop-blur-md rounded-lg p-2 sm:p-3 border border-orange-500/30 w-44 sm:w-64 md:w-72 lg:w-80">
      <h3 className="text-orange-500 font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-center">First Apparel Drop in:</h3>
      <div className="grid grid-cols-4 gap-1 sm:gap-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-orange-500 text-black font-bold text-sm sm:text-base lg:text-lg rounded w-full h-8 sm:h-10 lg:h-12 flex items-center justify-center">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-white text-[10px] sm:text-xs mt-1 uppercase font-mono">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
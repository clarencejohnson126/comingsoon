import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 45 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);
    targetDate.setHours(23, 59, 59, 0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black/90 backdrop-blur-md rounded-lg p-3 border border-orange-500/30 w-80">
      <h3 className="text-orange-500 font-bold text-sm mb-2 text-center">Blacklist closes in:</h3>
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-orange-500 text-black font-bold text-lg rounded w-full h-12 flex items-center justify-center">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-white text-xs mt-1 uppercase font-mono">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
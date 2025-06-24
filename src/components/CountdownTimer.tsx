import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // HARDCODED: 45 days from June 22, 2025 = July 7, 2025
    const targetDate = new Date('2025-07-07T23:59:59Z');

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
    <div className="bg-black/90 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30">
      <h3 className="text-orange-500 font-bold text-lg mb-4 text-center">Drop in:</h3>
      <div className="flex justify-center space-x-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-orange-500 text-black font-bold text-2xl px-3 py-2 rounded-lg min-w-[60px]">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-white text-xs mt-1 uppercase">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
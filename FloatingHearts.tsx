
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (30 - 15) + 15}px`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * (15 - 10) + 10}s`,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle text-pink-200"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            bottom: '-50px',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;

import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animFrameId;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    const handleResize = () => setSize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Delicate twinkling stars in gold, champagne, and diamond white
    const starCount = Math.floor((canvas.width * canvas.height) / 10000);
    const stars = Array.from({ length: Math.max(50, starCount) }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.7 + Math.random() * 1.6,
      alpha: 0.15 + Math.random() * 0.75,
      speed: 0.006 + Math.random() * 0.018,
      increasing: Math.random() > 0.5,
      color: i % 5 === 0 
        ? '223, 193, 136' // warm champagne gold
        : i % 4 === 0 
          ? '247, 214, 224' // soft rose dust
          : '255, 255, 255', // diamond white
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle effect
        if (star.increasing) {
          star.alpha += star.speed;
          if (star.alpha >= 0.95) star.increasing = false;
        } else {
          star.alpha -= star.speed;
          if (star.alpha <= 0.12) star.increasing = true;
        }

        ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
        ctx.shadowColor = `rgba(${star.color}, 0.8)`;
        ctx.shadowBlur = star.size * 2.5;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
    />
  );
};

export default StarryBackground;

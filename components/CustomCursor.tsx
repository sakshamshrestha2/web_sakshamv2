import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      // Check if target is interactive (button, link, input, or explicitly clickable)
      const isInteractive = 
        target.matches('button, a, input, textarea, [role="button"]') || 
        target.closest('button, a, input, textarea, [role="button"]');
      
      setIsHovering(!!isInteractive);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] top-0 left-0 mix-blend-difference"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
      }}
    >
      {/* Cursor Container */}
      <div 
        className={`
          flex items-center justify-center transition-all duration-200 ease-out
          ${isHovering ? 'w-8 h-8' : 'w-4 h-4'}
        `}
      >
        {/* Retro Box Cursor */}
        <div
          className={`
            w-full h-full border-2 shadow-[0_0_10px_rgba(57,255,20,0.5)]
            transition-all duration-200
            ${isHovering 
              ? 'border-retro-pink rotate-45 bg-retro-pink/10 shadow-[0_0_15px_rgba(255,0,255,0.6)]' 
              : 'border-retro-green bg-retro-green/20 animate-pulse-fast'
            }
            ${clicked ? 'scale-75' : 'scale-100'}
          `}
        >
          {/* Inner Center Dot (Only when not hovering for precision feel) */}
          {!isHovering && (
             <div className="absolute inset-0 m-auto w-1 h-1 bg-retro-green animate-blink opacity-70"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
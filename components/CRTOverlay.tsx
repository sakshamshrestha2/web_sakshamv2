import React from 'react';

const CRTOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden h-full w-full">
      {/* Scanlines */}
      <div 
        className="absolute inset-0 z-10"
        style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6))',
            backgroundSize: '100% 3px',
            opacity: 0.6
        }}
      ></div>
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 z-20"
        style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,1) 100%)',
            boxShadow: 'inset 0 0 5rem rgba(0,0,0,0.5)'
        }}
      ></div>
      
      {/* Flicker effect */}
      <div className="absolute inset-0 bg-white opacity-[0.02] animate-flicker pointer-events-none mix-blend-overlay z-30"></div>
    </div>
  );
};

export default CRTOverlay;
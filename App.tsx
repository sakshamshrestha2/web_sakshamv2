import React, { useState } from 'react';
import CRTOverlay from './components/CRTOverlay';
import Navigation from './components/Navigation';
import Typewriter from './components/Typewriter';
import CustomCursor from './components/CustomCursor';
import { PageView } from './types';
import { playHover, playClick } from './utils/sound';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('about');

  // Text content definitions
  const bodyText = `Yo, welcome to the site.

I’m Saksham. Yeah, I know this looks like a computer from 1998. That’s the point. 👾

Honestly, I got bored of how every website looks exactly the same these days, so I made this. It’s got that old-school aesthetic but runs on modern code (pretty sick, right?).

It’s basically a time machine. I’m mixing the best stuff from the past with the tools we have now. Why? Because the classics just hit different.

So look around, click some stuff, and hopefully, nothing crashes. Thanks for stopping by!

Peace, Saksham.`;

  const contactText = `
SYSTEM STATUS: ONLINE
COMMUNICATION CHANNELS: OPEN

> EMAIL: saksham@example.com
> GITHUB: @SakshamShrestha
> LOC: Grid Sector 7G

Transmission ready. Waiting for input...
`;

  return (
    <div className="min-h-screen bg-retro-black text-retro-green font-mono selection:bg-retro-pink selection:text-white overflow-hidden relative cursor-none">
      <CustomCursor />
      <CRTOverlay />
      
      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-4xl min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="border-2 border-retro-green p-4 sm:p-6 shadow-[0_0_15px_rgba(57,255,20,0.3)] bg-black/80 backdrop-blur-sm group hover:border-retro-pink transition-colors duration-300">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(57,255,20,0.8)] group-hover:text-retro-pink group-hover:drop-shadow-[0_0_10px_rgba(255,0,255,0.8)] transition-all duration-300 break-words">
              Saksham Shrestha
            </h1>
            <p className="text-retro-pink text-lg sm:text-xl md:text-2xl font-bold tracking-widest drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">
              @SakshamShrestha#
            </p>
          </div>
        </header>

        {/* Navigation */}
        <Navigation currentView={currentView} onChangeView={setCurrentView} />

        {/* Dynamic Content Area */}
        <main className="flex-grow border-l-4 border-retro-green pl-4 sm:pl-6 py-2 relative">
           {/* Decorative background element */}
           <div className="absolute top-0 right-0 text-retro-dimGreen opacity-20 text-8xl md:text-9xl font-bold select-none pointer-events-none -z-10 overflow-hidden">
             {currentView === 'about' ? '01' : '02'}
           </div>

          {currentView === 'about' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-3xl text-retro-pink mb-6 uppercase border-b border-retro-pink inline-block pb-1">
                // System.Root.User_Profile
              </h2>
              <div className="text-base sm:text-xl md:text-2xl leading-relaxed text-shadow-glow min-h-[300px] whitespace-pre-line">
                <Typewriter text={bodyText} speed={35} />
              </div>
            </div>
          )}

          {currentView === 'contact' && (
            <div className="space-y-6">
               <h2 className="text-xl sm:text-3xl text-retro-pink mb-6 uppercase border-b border-retro-pink inline-block pb-1">
                // System.Comms.Init
              </h2>
              <div className="whitespace-pre-wrap text-base sm:text-xl md:text-2xl leading-relaxed min-h-[300px]">
                <Typewriter text={contactText} speed={15} cursorColor="bg-retro-pink" />
              </div>
              
              <div className="mt-8 p-4 border border-dashed border-retro-green/50 bg-green-900/10">
                 <p className="text-sm text-retro-green/70 mb-2">SEND_MESSAGE.EXE</p>
                 <button 
                  onMouseEnter={playHover}
                  onClick={() => {
                      playClick();
                      window.location.href = 'mailto:saksham@example.com';
                  }}
                  className="bg-retro-green text-black px-4 py-2 sm:px-6 font-bold hover:bg-retro-pink hover:text-white transition-colors duration-300 uppercase tracking-widest text-sm sm:text-base"
                 >
                   Initialize Mail Protocol
                 </button>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center border-t border-retro-green/30 pt-6">
          <p className="text-retro-green/60 text-xs sm:text-sm md:text-base uppercase tracking-wider">
            © 2014 @SakshamShrestha#. All rights reserved.
          </p>
          <div className="mt-2 text-xs text-retro-dimGreen">
            <span>RAM: 64KB OK</span> | <span>SYSTEM: VAPOR_OS 9.5</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
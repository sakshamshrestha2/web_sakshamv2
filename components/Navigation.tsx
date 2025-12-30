import React from 'react';
import { PageView, NavItem } from '../types';
import { playHover, playClick } from '../utils/sound';

interface NavigationProps {
  currentView: PageView;
  onChangeView: (view: PageView) => void;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'ABOUT ME' },
  { id: 'contact', label: 'CONTACT' },
];

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  return (
    <nav className="mb-12 border-b-2 border-retro-green pb-4">
      <ul className="flex flex-col sm:flex-row gap-6 text-xl sm:text-2xl">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                onChangeView(item.id);
              }}
              className={`font-mono uppercase tracking-widest transition-all duration-300 ease-out hover:scale-110 hover:text-retro-pink hover:drop-shadow-[0_0_15px_rgba(255,0,255,1)] hover:tracking-[0.15em] focus:outline-none
                ${currentView === item.id 
                  ? 'text-retro-pink border-b-2 border-retro-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.8)] scale-105' 
                  : 'text-retro-green opacity-80 hover:opacity-100'
                }`}
            >
              [{item.label}]
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
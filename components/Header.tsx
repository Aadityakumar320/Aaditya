import React from 'react';
import { Music, LayoutDashboard, User } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isAdmin: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, isAdmin, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('USER')}
          >
            <div className="bg-indigo-600 p-2 rounded-lg mr-3 group-hover:scale-105 transition-transform">
              <Music className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              MoodMelody AI
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {currentView !== 'USER' && (
              <button 
                onClick={() => onNavigate('USER')}
                className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <User size={18} />
                User Mode
              </button>
            )}

            {currentView === 'USER' && !isAdmin && (
              <button 
                onClick={() => onNavigate('ADMIN_LOGIN')}
                className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <LayoutDashboard size={18} />
                Admin Login
              </button>
            )}

            {isAdmin && (
               <div className="flex items-center gap-4">
                 {currentView !== 'ADMIN_DASHBOARD' && (
                   <button 
                     onClick={() => onNavigate('ADMIN_DASHBOARD')}
                     className="text-indigo-400 hover:text-indigo-300 font-medium text-sm"
                   >
                     Dashboard
                   </button>
                 )}
                 <button 
                   onClick={onLogout}
                   className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
                 >
                   Logout
                 </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
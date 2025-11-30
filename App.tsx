import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserView from './components/UserView';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('USER');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check for existing session
  useEffect(() => {
    const session = localStorage.getItem('moodmelody_admin_session');
    if (session === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleNavigate = (view: ViewState) => {
    // Protect dashboard route
    if (view === 'ADMIN_DASHBOARD' && !isAdminLoggedIn) {
      setCurrentView('ADMIN_LOGIN');
    } else {
      setCurrentView(view);
    }
  };

  const handleLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('moodmelody_admin_session', 'true');
    setCurrentView('ADMIN_DASHBOARD');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('moodmelody_admin_session');
    setCurrentView('USER');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 bg-[url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-fixed bg-cover bg-no-repeat">
      {/* Dark overlay for better text readability */}
      <div className="min-h-screen bg-slate-900/90 backdrop-blur-sm">
        <Header 
          currentView={currentView} 
          onNavigate={handleNavigate} 
          isAdmin={isAdminLoggedIn}
          onLogout={handleLogout}
        />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
          {currentView === 'USER' && <UserView />}
          {currentView === 'ADMIN_LOGIN' && <AdminLogin onLogin={handleLogin} />}
          {currentView === 'ADMIN_DASHBOARD' && <AdminDashboard />}
        </main>

        <footer className="text-center py-6 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} MoodMelody AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
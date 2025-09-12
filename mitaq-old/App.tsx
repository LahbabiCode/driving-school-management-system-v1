import React, { useState, useEffect } from 'react';
import { StudentPortal } from './pages/StudentPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';

// Helper to manage session storage for admin login persistence
const checkAdminAuth = () => sessionStorage.getItem('isAdminAuthenticated') === 'true';
const setAdminAuth = (isAuth: boolean) => sessionStorage.setItem('isAdminAuthenticated', String(isAuth));


const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminAuth());

  const handleLogin = (success: boolean) => {
    if (success) {
      setAdminAuth(true);
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }
  
  return <AdminDashboard />;
};


const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (route === '#/admin') {
    return <AdminPortal />;
  }

  return <StudentPortal />;
};

export default App;

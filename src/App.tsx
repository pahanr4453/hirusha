import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // path fixed

// Components paths fixed based on your screenshot
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { Portfolio } from './components/public/Portfolio';
import { Packages } from './components/public/Packages';
import { About } from './components/public/About';
import { Contact } from './components/public/Contact';
import { Footer } from './components/public/Footer';
import { Loader } from './components/public/Loader';

// Admin components paths fixed
import { AdminLogin } from './components/AdminLogin'; 
import { AdminDashboard } from './components/admin/AdminDashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [isAdminView, setIsAdminView] = useState(false);
  const [siteLoading, setSiteLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSiteLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (siteLoading || loading) return <Loader />;

  if (isAdminView) {
    return (
      <div className="relative min-h-screen bg-slate-50">
        <button 
          onClick={() => setIsAdminView(false)}
          className="fixed bottom-6 right-6 z-[100] bg-red-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-xs"
        >
          Exit Admin
        </button>
        {user ? <AdminDashboard /> : <AdminLogin />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAdminClick={() => setIsAdminView(true)} />
      <main className="animate-in fade-in duration-1000">
        <Hero />
        <Portfolio />
        <Packages />
        <About />
        <Contact />
      </main>
      {/* Footer එක උඩ double click කරාම Admin login එක එනවා */}
      <div onDoubleClick={() => setIsAdminView(true)}>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
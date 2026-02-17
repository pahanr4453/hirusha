import { useState, useEffect } from 'react';
import { Camera, Menu, X, ArrowUpRight, Instagram, Globe, Facebook, Settings } from 'lucide-react';
import { supabase, SiteSettings } from '../../lib/supabase';

interface NavbarProps {
  onAdminClick: () => void;
}

export const Navbar = ({ onAdminClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    fetchSettings();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').maybeSingle();
    if (data) setSettings(data);
  };

  const navItems = [
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Packages', id: 'packages' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* MAIN NAVBAR WRAPPER */}
      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 flex justify-center px-4 md:px-12 ${
        isScrolled ? 'top-6' : 'top-0'
      }`}>
        <nav
          className={`relative flex items-center justify-between px-8 md:px-14 transition-all duration-500 ${
            isScrolled 
              ? 'w-full max-w-[1400px] h-16 bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
              : 'w-full h-28 bg-transparent border-transparent rounded-none'
          }`}
        >
          {/* UNDER-GLOW LINE (CSS Animated) */}
          <div className={`absolute bottom-[-1px] left-20 right-20 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* BRANDING */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-4 group"
          >
            <div className={`p-2 rounded-xl transition-all duration-500 ${
              isScrolled ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-white/5 border border-white/10'
            }`}>
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] md:text-[16px] font-black tracking-[0.3em] text-white uppercase italic leading-none">
                HIRUSHA <span className="text-blue-500 not-italic">SANJANA</span>
              </span>
              <span className={`text-[8px] font-bold tracking-[0.5em] text-white/30 uppercase mt-2 transition-all duration-500 ${
                isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
              }`}>
                Visual Storyteller
              </span>
            </div>
          </button>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-14">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* MOBILE TOGGLE ICON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 rounded-xl transition-all ${
              isScrolled ? 'bg-white/5 border border-white/10' : 'bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
          </button>
        </nav>
      </div>

      {/* MOBILE MENU (Pure CSS & Tailwind Transitions) */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/60 backdrop-blur-md md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] z-[120] bg-[#050505] border-l border-white/5 md:hidden transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-10 flex flex-col h-full">
          <div className="flex justify-end mb-16">
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-full text-white">
                <X size={24} />
             </button>
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-col gap-10">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className={`group flex flex-col items-start transition-all duration-700 delay-[${index * 100}ms] ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
              >
                <span className="text-[10px] font-black text-blue-500 tracking-[0.4em] mb-2">0{index + 1}</span>
                <span className="text-4xl font-black text-white/40 group-hover:text-white uppercase tracking-tighter transition-all italic">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* FOOTER OF MOBILE MENU */}
          <div className="mt-auto pt-10 border-t border-white/5">
            <div className="flex gap-6 mb-10">
              <Instagram className="text-white/40" size={20} />
              <Facebook className="text-white/40" size={20} />
              <Globe className="text-white/40" size={20} />
            </div>

            {/* HIDDEN ADMIN PORTAL */}
            <button 
              onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-3 text-white/10 hover:text-blue-500/50 transition-all group"
            >
              <Settings size={14} />
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">Configuration</span>
              <ArrowUpRight size={12} />
            </button>
            
            <p className="text-[8px] font-bold text-white/10 uppercase tracking-[0.5em] mt-6">
              HIRUSHA SANJANA © 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
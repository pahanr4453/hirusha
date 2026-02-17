import { useEffect, useState } from 'react';
import { supabase, SiteSettings } from '../../lib/supabase';
import { Camera, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').maybeSingle();
    if (data) setSettings(data);
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* BACKGROUND IMAGE WITH CINEMATIC ZOOM */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 0.5 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: settings?.hero_image
            ? `url(${settings.hero_image})`
            : 'url(https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />

      {/* OVERLAY GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />

      <div className="relative z-10 text-center text-white px-6">
        {/* ICON ANIMATION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-xl transition-all duration-700" />
            <div className="relative bg-white/5 backdrop-blur-2xl p-5 rounded-3xl border border-white/10">
              <Camera className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* SITE NAME */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic"
        >
          {settings?.site_name?.split(' ')[0] || 'HIRUSHA'}
          <span className="text-blue-600 not-italic">.</span>
          <span className="block text-2xl md:text-4xl font-light tracking-[0.4em] mt-2 text-white/80 not-italic">
            {settings?.site_name?.split(' ')[1] || 'SANJANA'}
          </span>
        </motion.h1>

        {/* TAGLINE */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-sm md:text-lg mb-12 text-white/50 max-w-xl mx-auto font-medium uppercase tracking-[0.5em] leading-relaxed"
        >
          {settings?.tagline || 'Capturing moments, creating memories'}
        </motion.p>

        {/* CALL TO ACTION BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <button
            onClick={scrollToPortfolio}
            className="group relative px-12 py-5 bg-white text-black overflow-hidden rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-300">
              Enter Gallery <Sparkles size={14} className="text-blue-600" />
            </span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        onClick={scrollToPortfolio}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.5em] rotate-90 mb-8 origin-left">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.button>
    </div>
  );
};
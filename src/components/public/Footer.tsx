import { Camera, Heart, Sparkles, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* TOP ROW: BRAND & NAV */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
          {/* Brand - Left */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <Camera className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-black tracking-[0.3em] uppercase">
                Hirusha <span className="text-slate-400 font-medium tracking-normal text-xs">Sanjana</span>
              </h3>
            </div>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-600 mt-2 ml-7 italic">
              Fine Art Photography
            </p>
          </div>

          {/* Nav Links - Right (Now clearly on the side) */}
          <nav className="flex items-center gap-8">
            {['Home', 'Portfolio', 'About', 'Contact'].map((link) => (
              <motion.a 
                key={link}
                href={`#${link.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>
        </div>

        {/* MIDDLE SECTION: THE SIGNATURE BOX (Centered) */}
        <div className="flex justify-center mb-16">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.07] px-8 py-3 rounded-full backdrop-blur-sm group"
          >
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-600">Designed & Developed by</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black tracking-[0.15em] uppercase bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] animate-text-gradient bg-clip-text text-transparent">
                SENESH PAHAN
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-blue-500 group-hover:shadow-[0_0_10px_#2563eb]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM ROW: LEGAL, STATUS & COPYRIGHT */}
        <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Legal Links */}
          <div className="flex items-center gap-6 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600">
            <a href="#" className="hover:text-slate-400">Terms & Conditions</a>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <span className="flex items-center gap-2 ml-4">
              <Globe size={10} /> Sri Lanka
            </span>
          </div>

          {/* Site Status */}
          <div className="flex items-center gap-3 px-4 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-full">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 uppercase">
              System <span className="text-white">Active</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-[0.3em] text-slate-700">
            <span>© {currentYear} HIRUSHA SANJANA</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-gradient {
          animation: text-gradient 3s linear infinite;
        }
      `}</style>
    </footer>
  );
};
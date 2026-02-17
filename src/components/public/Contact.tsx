import { useEffect, useState } from 'react';
import { supabase, SiteSettings } from '../../lib/supabase';
import { Mail, Instagram, Facebook, ArrowRight, Linkedin, Sparkles, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').maybeSingle();
    if (data) setSettings(data);
  };

  return (
    <section id="contact" className="py-40 bg-[#050505] relative overflow-hidden">
      {/* Cinematic Background Lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[180px] -z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[180px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - Minimal & Clean */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-[0.6em] mb-6">
              <span className="w-10 h-[1px] bg-blue-500"></span>
              Get in Touch
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-0">
              LET'S <br /> <span className="text-slate-800">TALK.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-lg md:text-xl max-w-[300px] font-medium leading-relaxed border-l border-slate-800 pl-8"
          >
            Turning your vision into a visual masterpiece. Available for global projects.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Booking Card (Large) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-[#0D0D0D] border border-white/5 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-20 transition-opacity">
               <Sparkles size={120} className="text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                HAVE A PROJECT <br /> <span className="text-blue-500 italic">IN MIND?</span>
              </h3>
              <p className="text-slate-400 text-lg mb-12 max-w-md">
                "Capturing the moments of today that will wow your heart tomorrow." Let's create something iconic.
              </p>
              
              <a 
                href={`mailto:${(settings as any)?.contact_email}`}
                className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 group/btn"
              >
                Start a Conversation
                <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Social Card (Tall) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-[3.5rem] p-12 flex flex-col justify-between"
          >
            <h4 className="text-white/20 font-black text-[10px] uppercase tracking-[0.5em] mb-12">Social Channels</h4>
            <div className="space-y-4">
              {[
                { name: 'Instagram', icon: <Instagram />, link: '#' },
                { name: 'Facebook', icon: <Facebook />, link: '#' },
                { name: 'LinkedIn', icon: <Linkedin />, link: '#' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.link}
                  className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-white hover:bg-blue-600 transition-all group"
                >
                  <span className="flex items-center gap-4 font-bold tracking-tight">
                    {social.icon} {social.name}
                  </span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Info Cards (Bottom Row) */}
          <div className="md:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-[3.5rem] p-12">
            <MapPin className="text-blue-500 mb-6" size={32} />
            <h4 className="text-white text-xl font-bold mb-2">Location</h4>
            <p className="text-slate-500">Colombo, Sri Lanka <br /> Available Worldwide</p>
          </div>

          <div className="md:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-[3.5rem] p-12">
            <Globe className="text-blue-500 mb-6" size={32} />
            <h4 className="text-white text-xl font-bold mb-2">Language</h4>
            <p className="text-slate-500">English, Sinhala <br /> Professional Communication</p>
          </div>

          <div className="md:col-span-4 bg-blue-600 rounded-[3.5rem] p-12 flex items-center justify-center group cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="text-center">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Current Status</p>
              <h4 className="text-white text-2xl font-black italic tracking-tighter">AVAILABLE FOR <br /> NEW BOOKINGS</h4>
            </div>
          </div>
        </div>  
      </div>
    </section>
  );
};
import { useEffect, useState } from 'react';
import { supabase, SiteSettings } from '../../lib/supabase';
import { Mail, Instagram, Facebook, MessageCircle, Camera, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [displayText, setDisplayText] = useState("");
  
  // වැකිය Settings වලින් හෝ default එකකින් ගන්නවා
  const fullText = (settings as any)?.about || "I'm a passionate photographer dedicated to capturing life's most precious moments. With years of experience and a keen eye for detail, I transform ordinary scenes into extraordinary memories.";
  
  const whatsappNumber = "94789185026"; 

  useEffect(() => {
    fetchSettings();
  }, []);

  // Typewriter Effect Logic
  useEffect(() => {
    let i = 0;
    setDisplayText(""); 
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); 

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').maybeSingle();
    if (data) {
      setSettings(data);
    }
  };

  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* --- IMAGE SECTION --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full lg:w-1/2"
          >
            <div className="relative max-w-[500px] mx-auto">
              
              {/* Background Decoration */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10 animate-pulse" />

              {/* Main Image Frame */}
              <div className="relative z-10 group">
                {/* Decorative Black Box behind image */}
                <div className="absolute inset-0 bg-slate-900 rounded-[4rem] rotate-3 transition-transform group-hover:rotate-0 duration-700" />
                
                <div className="relative aspect-[4/5] rounded-[3.8rem] overflow-hidden border-[12px] border-white shadow-2xl bg-slate-100">
                  <img
                    // Admin එකේ 'about_image' හෝ 'hero_image' දෙකෙන් එකක් ගනී
                    src={
                      (settings as any)?.about_image || 
                      (settings as any)?.hero_image || 
                      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070"
                    }
                    alt="Hirusha Sanjana"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                {/* Experience Badge */}
                <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 border border-slate-50">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                         <Camera size={28} />
                      </div>
                      <div>
                         <p className="text-2xl font-black text-slate-900 leading-none">5+ Years</p>
                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Experience</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- CONTENT SECTION --- */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-100">
              <Award size={14} className="text-blue-600" />
              <span>Professional Photographer</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.9]">
              Hirusha <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase">Sanjana</span>
            </h2>

            <div className="min-h-[160px] relative">
               <span className="absolute -top-8 -left-4 text-8xl text-slate-100 font-serif -z-10 opacity-50">“</span>
               <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-12 font-medium italic">
                  {displayText}
                  <span className="inline-block w-1.5 h-6 ml-2 bg-blue-600 animate-bounce"></span>
               </p>
            </div>

            {/* Actions & Socials */}
            <div className="flex flex-wrap items-center gap-6 pt-10 border-t border-slate-100">
              
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="group relative flex items-center gap-3 bg-slate-950 text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <MessageCircle size={20} className="relative z-10" />
                <span className="relative z-10">Hire Me Now</span>
              </a>

              <div className="flex items-center gap-4">
                <a href="#" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                  <Instagram size={22} />
                </a>
                <a href="#" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                  <Facebook size={22} />
                </a>
                {(settings as any)?.contact_email && (
                  <a href={`mailto:${(settings as any).contact_email}`} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                    <Mail size={22} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
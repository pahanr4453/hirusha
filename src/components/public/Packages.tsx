import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Check, 
  Crown, 
  ArrowRight, 
  Camera, 
  Sparkles, 
  Plus, 
  Info, 
  ShieldCheck, 
  Zap,
  Gem,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Packages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const WHATSAPP_NUMBER = "94771234567"; 

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('price', { ascending: true });

        if (!error) setPackages(data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleBooking = (pkgName: string, pkgPrice: any) => {
    const message = `Hello Hirusha Sanjana! 👋%0A%0AI am interested in the *${pkgName}* Premium Package.%0AInvestment: *Rs. ${pkgPrice.toLocaleString()}*%0A%0ACan we discuss the dates?`;
    const whatsappUrl = `https://wa.me/${761151536}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 border-2 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-slate-500 font-black uppercase tracking-[0.5em] text-[10px]">HS Studios Loading</p>
    </div>
  );

  return (
    <section id="packages" className="py-40 bg-[#000000] relative overflow-hidden">
      
      {/* --- BACKGROUND ANIMATION ELEMENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Animated Floating Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" 
        />

        {/* Floating Particles/Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random(), 
              x: Math.random() * 1800, 
              y: Math.random() * 2000 
            }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity,
              delay: Math.random() * 5 
            }}
            className="absolute"
          >
            <Star size={Math.random() * 8} className="text-blue-500/40 fill-blue-500/20" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* CINEMATIC HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32 text-center md:text-left md:flex md:items-end md:justify-between border-b border-white/5 pb-20"
        >
          <div className="max-w-3xl">
            <div className="flex items-center justify-center md:justify-start gap-4 text-blue-500 font-black text-[11px] uppercase tracking-[0.5em] mb-8">
              <span className="w-12 h-[1px] bg-blue-500"></span>
              PREMIUM INVESTMENT
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-0 tracking-tighter uppercase italic leading-[0.85]">
              Pricing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 not-italic">Collections.</span>
            </h2>
          </div>
          
          <div className="mt-12 md:mt-0 flex flex-col items-center md:items-end">
             <div className="flex items-center gap-3 mb-4 text-blue-500/50">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secure Your Date</span>
             </div>
             <p className="text-slate-400 text-sm md:text-base font-bold max-w-[280px] leading-relaxed uppercase tracking-widest italic text-center md:text-right opacity-60">
               "Quality is remembered long after the price is forgotten."
             </p>
          </div>
        </motion.div>
        
        {/* PACKAGE GRID - Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {packages.map((pkg, index) => (
            <motion.div 
              key={pkg.id} 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`group relative rounded-[4rem] p-[2px] transition-all duration-700 ${
                pkg.popular 
                ? 'bg-gradient-to-br from-blue-600/50 to-indigo-900/50 shadow-[0_40px_100px_-15px_rgba(37,99,235,0.15)]' 
                : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {/* Card Main Body - Pure Black Luxury */}
              <div className="bg-[#050505] rounded-[3.9rem] h-full p-12 md:p-14 flex flex-col relative overflow-hidden transition-all duration-700 group-hover:-translate-y-4 border border-white/5">
                
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                {/* Card Top Section */}
                <div className="relative z-10 mb-12 flex justify-between items-start">
                  <div>
                    <h3 className="text-white text-4xl font-black tracking-tighter mb-2 uppercase italic leading-none">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black tracking-[0.2em] uppercase">
                        <Sparkles size={12} className="animate-pulse" /> {pkg.popular ? 'The Elite Series' : 'Essential Collection'}
                    </div>
                  </div>
                  <div className={`p-5 rounded-[2rem] transition-all duration-500 group-hover:rotate-12 ${
                    pkg.popular ? 'bg-blue-600/10 text-blue-500' : 'bg-white/5 text-slate-500'
                  }`}>
                    {pkg.popular ? <Crown size={30} strokeWidth={2.5} /> : <Camera size={30} strokeWidth={2.5} />}
                  </div>
                </div>

                {/* Price Display */}
                <div className="relative z-10 mb-12 pb-12 border-b border-white/5">
                   <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Investment Starting At</div>
                   <div className="flex items-baseline gap-3">
                      <span className="text-white text-6xl font-black tracking-tighter">
                         LKR {pkg.price.toLocaleString()}
                      </span>
                   </div>
                </div>

                {/* Features List */}
                <div className="relative z-10 flex-grow mb-14">
                   <ul className="space-y-6">
                    {pkg.features?.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-5 group/item">
                        <div className="mt-1 w-6 h-6 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-all duration-500">
                          <Check size={14} className="text-blue-500 group-hover/item:text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-400 text-[14px] font-bold tracking-tight leading-snug group-hover/item:text-white transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="relative z-10 mt-auto">
                   <button 
                    onClick={() => handleBooking(pkg.name, pkg.price)}
                    className={`group/btn relative w-full py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-5 overflow-hidden shadow-2xl ${
                      pkg.popular 
                      ? 'bg-blue-600 text-white shadow-blue-900/40' 
                      : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">Request Booking</span>
                    <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-3 transition-transform duration-500" />
                    
                    {/* Animated Shine */}
                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 opacity-30" />
                  </button>
                </div>

                {/* Card Footer */}
                <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center opacity-40">
                   <div className="flex flex-col">
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">Signature Selection</span>
                      <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-1">© Hirusha Sanjana</span>
                   </div>
                   <div className="flex gap-2">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1] }} 
                        transition={{ duration: 2, repeat: Infinity }} 
                        className="w-1.5 h-1.5 bg-blue-600 rounded-full" 
                      />
                      <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                   </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-32 text-center">
           <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 rounded-full border border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              <Zap size={14} className="text-blue-500" />
              Custom Packages Available Upon Request
           </div>
        </div>
      </div>
    </section>
  );
};
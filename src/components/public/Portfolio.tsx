import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Facebook, LayoutGrid, MapPin, Calendar, Maximize2, X, Sparkles, ArrowRight, Camera, Share2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading Masterpiece
  if (loading) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <div className="w-16 h-16 border-2 border-slate-100 rounded-full" />
        <div className="absolute inset-0 border-t-2 border-blue-600 rounded-full animate-spin" />
      </div>
      <p className="mt-8 text-slate-400 font-black tracking-[0.5em] uppercase text-[9px] animate-pulse">
        Developing Masterpieces
      </p>
    </div>
  );

  return (
    <section id="portfolio" className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* HEADER SECTION - Compact & Minimalist */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-100">
            <Sparkles size={12} />
            <span>Featured Portfolio</span>
          </div>
          
          {/* Header text made smaller as requested (text-5xl md:text-7xl) */}
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter italic uppercase leading-none">
            Visual <span className="text-blue-600 not-italic">Stories.</span>
          </h2>
          
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8 rounded-full" />
          
          <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm font-bold uppercase tracking-[0.3em] leading-relaxed opacity-70">
            A curated collection of moments captured in time.
          </p>
        </motion.div>
        
        {/* GRID LAYOUT - Interaction based on Scroll and Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: (index % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              onClick={() => setSelectedProject(project)}
              className="group relative h-[600px] cursor-pointer"
            >
              {/* Main Card Wrapper */}
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-slate-50 border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] group-hover:-translate-y-4">
                
                {/* Background Image with Slow Zoom on Hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  />
                </div>

                {/* Top Badge */}
                <div className="absolute top-8 left-8 z-30">
                  <span className="px-4 py-1.5 backdrop-blur-md bg-black/20 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-xl">
                    {project.category}
                  </span>
                </div>

                {/* Center Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-md text-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Maximize2 size={24} />
                  </div>
                </div>

                {/* Bottom Glassy Info Box */}
                <div className="absolute inset-x-6 bottom-6 z-30 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <div className="backdrop-blur-3xl bg-white/80 border border-white/50 p-7 rounded-[2.5rem] shadow-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-blue-600 text-[9px] font-black uppercase tracking-widest">
                        <Calendar size={12} />
                        <span>{new Date(project.date).getFullYear()}</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                        <MapPin size={12} />
                        <span>Sri Lanka</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop Blur */}
            <div 
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl" 
              onClick={() => setSelectedProject(null)} 
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full h-full max-w-7xl bg-white rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-3xl"
            >
              {/* Close Circle Mobile */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all md:hidden"
              >
                <X size={20} />
              </button>

              {/* Slider View (65%) */}
              <div className="w-full md:w-[65%] h-[45vh] md:h-full bg-black relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  effect="fade"
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500 }}
                  className="w-full h-full"
                >
                  {(selectedProject.images_data?.length > 0 ? selectedProject.images_data : [selectedProject.image_url]).map((img: string, idx: number) => (
                    <SwiperSlide key={idx}>
                      <img src={img} className="w-full h-full object-contain md:object-cover" alt="Gallery Item" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Content Side (35%) */}
              <div className="w-full md:w-[35%] p-10 md:p-14 flex flex-col justify-center bg-white border-l border-slate-50 relative">
                {/* Close Desktop */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-10 right-10 p-4 bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-2xl transition-all hidden md:block"
                >
                  <X size={20} />
                </button>

                <div className="mb-8">
                  <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                    <Camera size={14} />
                    <span>Behind the Lens</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 tracking-tighter uppercase italic leading-[0.9]">
                    {selectedProject.title}
                  </h2>
                  <div className="h-1 w-12 bg-blue-600 rounded-full" />
                </div>

                <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <MapPin className="text-blue-600" size={18} />
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Sri Lanka, Island Wide</p>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Share2 className="text-blue-600" size={18} />
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{selectedProject.category}</p>
                   </div>
                </div>

                <p className="text-slate-500 text-base leading-relaxed mb-12 font-medium">
                  {selectedProject.description || "A story told through the frame, focusing on emotions that last a lifetime."}
                </p>
                
                <a
                  href={selectedProject.fb_link || '#'}
                  target="_blank"
                  className="flex items-center justify-between px-8 py-6 bg-[#1877F2] text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-blue-600/20 transition-all active:scale-95"
                >
                  View Full Album <Facebook size={18} fill="white" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
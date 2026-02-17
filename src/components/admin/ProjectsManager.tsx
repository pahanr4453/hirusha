import { useState, useEffect } from 'react';
import { supabase, Project } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Star, Facebook, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectForm } from './ProjectForm';

export const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Slide view එක පාලනය කරන්න
  const [currentSlideIndex, setCurrentSlideIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  const nextSlide = (projectId: string, imagesCount: number) => {
    setCurrentSlideIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % imagesCount
    }));
  };

  const prevSlide = (projectId: string, imagesCount: number) => {
    setCurrentSlideIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + imagesCount) % imagesCount
    }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
        <button onClick={() => setShowForm(true)} className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {showForm ? (
        <ProjectForm project={editingProject} onClose={() => { setShowForm(false); setEditingProject(null); fetchProjects(); }} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const images = (project as any).images_data || [project.image_url];
            const currentIndex = currentSlideIndex[project.id] || 0;

            return (
              <div key={project.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all relative">
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {/* Image Display */}
                  <img
                    src={images[currentIndex]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />

                  {/* Facebook Button Overlay */}
                  {(project as any).fb_link && (
                    <a 
                      href={(project as any).fb_link}
                      target="_blank"
                      className="absolute top-3 left-3 bg-[#1877F2] text-white px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-20 flex items-center gap-2 hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Facebook size={14} fill="white" />
                      <span className="text-[10px] font-bold">View on FB</span>
                    </a>
                  )}

                  {/* Slide Navigation Buttons */}
                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => prevSlide(project.id, images.length)} className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={() => nextSlide(project.id, images.length)} className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}

                  {/* Featured Icon */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-amber-400 p-1.5 rounded-full z-10">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}

                  {/* Slide Dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {images.map((_: any, i: number) => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'}`} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-1">{project.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{project.category}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingProject(project); setShowForm(true); }} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
import { useState } from 'react';
import { supabase, Project } from '../../lib/supabase';
import { X, Upload, Loader2, Trash2 } from 'lucide-react';

interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectForm = ({ project, onClose }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image_url: project?.image_url || '',
    category: project?.category || 'wedding',
    date: project?.date || new Date().toISOString().split('T')[0],
    featured: project?.featured || false,
    order_index: project?.order_index || 0,
    // Project එකට අදාල FB Link එක සහ පින්තූර ලිස්ට් එක
    fb_link: (project as any)?.fb_link || '',
    images_data: (project as any)?.images_data || []
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      setError('');
      const newImages = [...formData.images_data];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath);

        newImages.push(publicUrl);
      }

      setFormData({ 
        ...formData, 
        images_data: newImages,
        image_url: formData.image_url || newImages[0] 
      });
    } catch (err: any) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (project) {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([payload]);
        if (error) throw error;
      }
      onClose();
    } catch (err) {
      setError('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-slate-100 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Facebook Post Link
          </label>
          <input
            type="text"
            placeholder="https://facebook.com/your-post-link"
            value={formData.fb_link}
            onChange={(e) => setFormData({ ...formData, fb_link: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Project Images (Multiple)
          </label>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {formData.images_data.map((url: string, idx: number) => (
              <div key={idx} className="relative group border rounded-lg overflow-hidden h-20 shadow-sm">
                <img src={url} className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => {
                    const updated = formData.images_data.filter((_: any, i: number) => i !== idx);
                    setFormData({ ...formData, images_data: updated });
                  }} 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
          
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl py-6 hover:bg-slate-50 cursor-pointer transition-all">
            {uploading ? (
              <Loader2 className="animate-spin text-blue-500" />
            ) : (
              <Upload className="text-slate-400" />
            )}
            <span className="text-sm text-slate-500 mt-2">
              {uploading ? 'Uploading...' : 'Click to add photos'}
            </span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={handleFileUpload} 
              disabled={uploading}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="wedding">Wedding</option>
              <option value="portrait">Portrait</option>
              <option value="event">Event</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-slate-900 rounded focus:ring-slate-900"
            />
            <span className="text-sm font-medium text-slate-700">
              Feature this project
            </span>
          </label>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Order
            </label>
            <input
              type="number"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Project'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
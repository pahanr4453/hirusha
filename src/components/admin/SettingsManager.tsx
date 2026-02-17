import { useState, useEffect } from 'react';
import { supabase, SiteSettings } from '../../lib/supabase';
import { Upload, Loader2, Save } from 'lucide-react';

export const SettingsManager = () => {
  const [settings, setSettings] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<'hero' | 'profile' | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*').maybeSingle();
    if (!error && data) setSettings(data);
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'hero' | 'profile') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingField(field);
      const fileExt = file.name.split('.').pop();
      const fileName = `${field}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `settings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      setSettings({ ...settings, [field === 'hero' ? 'hero_image' : 'profile_image']: publicUrl });
    } catch (err) {
      alert('Upload failed!');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ ...settings, updated_at: new Date().toISOString() })
        .eq('id', settings.id);
      if (error) throw error;
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading settings...</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Site Settings</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-8">
        {message && <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{message}</div>}

        {/* Profile Image (About) */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-4">About Photo</label>
          <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <img src={settings.profile_image || "/me.jpg"} className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md" />
            <label className="flex-1 cursor-pointer">
              <div className="flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-100 transition-all font-semibold">
                {uploadingField === 'profile' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                Change Photo
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} />
            </label>
          </div>
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-4">Hero Image</label>
          <div className="relative aspect-video rounded-xl overflow-hidden border">
            <img src={settings.hero_image} className="w-full h-full object-cover" />
            <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
              <Upload className="mb-2" /> Change Hero Image
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero')} />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">About Description</label>
            <textarea
              value={settings.about}
              onChange={(e) => setSettings({ ...settings, about: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Facebook</label>
              <input
                type="text"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving || !!uploadingField}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
};
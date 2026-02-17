import { useState } from 'react';
import { supabase, Package } from '../../lib/supabase';
import { X, Plus, Minus } from 'lucide-react';

interface PackageFormProps {
  package: Package | null;
  onClose: () => void;
}

export const PackageForm = ({ package: pkg, onClose }: PackageFormProps) => {
  const [formData, setFormData] = useState({
    name: pkg?.name || '',
    description: pkg?.description || '',
    price: pkg?.price || '',
    features: pkg?.features || [''],
    popular: pkg?.popular || false,
    order_index: pkg?.order_index || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const filteredFeatures = formData.features.filter(f => f.trim() !== '');

    try {
      if (pkg) {
        const { error } = await supabase
          .from('packages')
          .update({
            ...formData,
            features: filteredFeatures,
            updated_at: new Date().toISOString(),
          })
          .eq('id', pkg.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('packages')
          .insert([{ ...formData, features: filteredFeatures }]);
        if (error) throw error;
      }
      onClose();
    } catch (err) {
      setError('Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {pkg ? 'Edit Package' : 'Add New Package'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Package Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            placeholder="e.g., Basic, Professional, Premium"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Price
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            placeholder="e.g., $499, Contact for pricing"
            required
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
            placeholder="Brief description of what's included"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700">
              Features
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>

          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Feature description"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              className="w-4 h-4 text-slate-900 rounded focus:ring-slate-900"
            />
            <span className="text-sm font-medium text-slate-700">Mark as popular</span>
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
            disabled={loading}
            className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Package'}
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

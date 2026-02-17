import { useState, useEffect } from 'react';
import { supabase, Package } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { PackageForm } from './PackageForm';

export const PackagesManager = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setPackages(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    const { error } = await supabase.from('packages').delete().eq('id', id);
    if (!error) {
      fetchPackages();
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPackage(null);
    fetchPackages();
  };

  if (loading) {
    return <div className="text-center py-12">Loading packages...</div>;
  }

  if (showForm) {
    return <PackageForm package={editingPackage} onClose={handleFormClose} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Packages</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      {packages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-600">No packages yet. Add your first package to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all relative"
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  POPULAR
                </div>
              )}

              <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
              <p className="text-3xl font-bold text-slate-900 mb-4">{pkg.price}</p>
              <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>

              <ul className="space-y-2 mb-6">
                {pkg.features?.map((feature, index) => (
                  <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

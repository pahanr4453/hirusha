import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { ProjectsManager } from './ProjectsManager';
import { PackagesManager } from './PackagesManager';
import { SettingsManager } from './SettingsManager';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'packages' | 'settings'>('projects');

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'projects' && <ProjectsManager />}
      {activeTab === 'packages' && <PackagesManager />}
      {activeTab === 'settings' && <SettingsManager />}
    </AdminLayout>
  );
};

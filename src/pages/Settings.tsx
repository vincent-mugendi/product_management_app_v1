
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account and application settings</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <SettingsIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Settings Coming Soon</h3>
        <p className="text-gray-500">
          This feature is currently in development.
          Check back later for account and application settings.
        </p>
      </div>
    </div>
  );
};

export default Settings;

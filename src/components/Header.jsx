import React from 'react';
import { CloudSun } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <CloudSun size={36} className="mr-3 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white">Weather Insights</h1>
            <p className="text-primary-100 text-sm">Historical Weather Dashboard</p>
          </div>
        </div>
        <div className="text-sm text-primary-100">
          <p>Powered by Open-Meteo Historical Weather API</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Weather Insights Dashboard
            </p>
          </div>
          <div className="text-sm">
            <p>Weather data provided by <a href="https://open-meteo.com/" className="text-primary-300 hover:text-primary-200 transition-colors" target="_blank" rel="noopener noreferrer">Open-Meteo API</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
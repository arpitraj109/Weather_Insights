import React, { useState } from 'react';
import InputForm from './InputForm';
import WeatherDisplay from './WeatherDisplay';
import { useWeather } from '../context/WeatherContext';

const Dashboard = () => {
  const { weatherData, loading, error } = useWeather();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Search Historical Weather Data</h2>
          <InputForm />
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-start">
              <div className="ml-3">
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-gray-700">Loading weather data...</span>
          </div>
        )}
        
        {weatherData && !loading && (
          <WeatherDisplay data={weatherData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
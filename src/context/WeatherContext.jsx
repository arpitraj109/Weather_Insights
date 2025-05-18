import React, { createContext, useState, useContext } from 'react';
import { fetchWeatherData } from '../utils/api';
import { processWeatherData } from '../utils/dataProcessing';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const getWeatherData = async (latitude, longitude, startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchWeatherData(latitude, longitude, startDate, endDate);
      const processedData = processWeatherData(data);
      
      setWeatherData(processedData);
      setCoordinates({ latitude, longitude });
      setDateRange({ startDate, endDate });
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setWeatherData(null);
    setError(null);
  };

  const value = {
    weatherData,
    loading,
    error,
    coordinates,
    dateRange,
    getWeatherData,
    clearData
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};
// Utility functions to process weather data

export const processWeatherData = (data) => {
  // Check if data has expected structure
  if (!data || !data.daily) {
    throw new Error('Invalid data format received from API');
  }
  
  const { daily } = data;
  
  // Format dates for better display
  const formattedDates = daily.time.map(dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  });
  
  // Return processed data
  return {
    time: formattedDates,
    temperature_2m_max: daily.temperature_2m_max,
    temperature_2m_min: daily.temperature_2m_min,
    temperature_2m_mean: daily.temperature_2m_mean,
    apparent_temperature_max: daily.apparent_temperature_max,
    apparent_temperature_min: daily.apparent_temperature_min,
    apparent_temperature_mean: daily.apparent_temperature_mean,
    rawDates: daily.time // Keep original dates for other uses
  };
};

// Calculate statistical data for weather metrics
export const calculateStatistics = (data, metric) => {
  if (!data || !data[metric] || !Array.isArray(data[metric])) {
    return { min: 0, max: 0, avg: 0 };
  }
  
  const values = data[metric];
  
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;
  
  return {
    min: min,
    max: max,
    avg: avg.toFixed(1)
  };
};
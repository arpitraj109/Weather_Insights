// API utility to fetch weather data from Open-Meteo API

export const fetchWeatherData = async (latitude, longitude, startDate, endDate) => {
  const baseUrl = 'https://archive-api.open-meteo.com/v1/archive';
  
  // Build query parameters
  const params = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    start_date: startDate,
    end_date: endDate,
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'temperature_2m_mean',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'apparent_temperature_mean'
    ].join(','),
    timezone: 'auto'
  });
  
  const url = `${baseUrl}?${params.toString()}`;
  
  try {
    // Add a small delay to prevent excessive API calls
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const response = await fetch(url);
    
    if (!response.ok) {
      let errorMessage = `API Error: ${response.status}`;
      
      // Try to get more detailed error information
      try {
        const errorData = await response.json();
        if (errorData.reason) {
          errorMessage = errorData.reason;
        }
      } catch (e) {
        // If we can't parse error JSON, just use the status code
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};
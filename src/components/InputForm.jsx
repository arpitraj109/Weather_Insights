import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useWeather } from '../context/WeatherContext';
import { validateCoordinates, validateDateRange } from '../utils/validation';
import { MapPin, Calendar, RefreshCw } from 'lucide-react';

const InputForm = () => {
  const { getWeatherData, loading, clearData } = useWeather();
  const [formState, setFormState] = useState({
    latitude: '',
    longitude: '',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date()
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    
    // Clear related errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleDateChange = (date, fieldName) => {
    setFormState({
      ...formState,
      [fieldName]: date
    });
    
    // Clear related errors
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const coordErrors = validateCoordinates(formState.latitude, formState.longitude);
    const dateErrors = validateDateRange(formState.startDate, formState.endDate);
    const validationErrors = { ...coordErrors, ...dateErrors };
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Format dates for API
    const startDateFormatted = format(formState.startDate, 'yyyy-MM-dd');
    const endDateFormatted = format(formState.endDate, 'yyyy-MM-dd');
    
    // Fetch data
    getWeatherData(
      parseFloat(formState.latitude),
      parseFloat(formState.longitude),
      startDateFormatted,
      endDateFormatted
    );
  };

  const handleReset = () => {
    setFormState({
      latitude: '',
      longitude: '',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    setErrors({});
    clearData();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="latitude" className="label flex items-center">
            <MapPin size={16} className="mr-1 text-gray-500" />
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formState.latitude}
            onChange={handleChange}
            placeholder="e.g. 40.7128"
            className="input"
            disabled={loading}
          />
          {errors.latitude && <p className="error">{errors.latitude}</p>}
        </div>
        
        <div>
          <label htmlFor="longitude" className="label flex items-center">
            <MapPin size={16} className="mr-1 text-gray-500" />
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formState.longitude}
            onChange={handleChange}
            placeholder="e.g. -74.0060"
            className="input"
            disabled={loading}
          />
          {errors.longitude && <p className="error">{errors.longitude}</p>}
        </div>
        
        <div>
          <label htmlFor="startDate" className="label flex items-center">
            <Calendar size={16} className="mr-1 text-gray-500" />
            Start Date
          </label>
          <DatePicker
            selected={formState.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            selectsStart
            startDate={formState.startDate}
            endDate={formState.endDate}
            maxDate={new Date()}
            className="input"
            disabled={loading}
            dateFormat="MMMM d, yyyy"
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
        </div>
        
        <div>
          <label htmlFor="endDate" className="label flex items-center">
            <Calendar size={16} className="mr-1 text-gray-500" />
            End Date
          </label>
          <DatePicker
            selected={formState.endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
            selectsEnd
            startDate={formState.startDate}
            endDate={formState.endDate}
            minDate={formState.startDate}
            maxDate={new Date()}
            className="input"
            disabled={loading}
            dateFormat="MMMM d, yyyy"
          />
          {errors.endDate && <p className="error">{errors.endDate}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleReset}
          className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500"
          disabled={loading}
        >
          <RefreshCw size={16} className="mr-1" /> Reset
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner mr-2"></span>
              Loading...
            </>
          ) : (
            'Get Weather Data'
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
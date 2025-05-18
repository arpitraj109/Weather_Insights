import React, { useState } from 'react';
import WeatherGraph from './WeatherGraph';
import WeatherTable from './WeatherTable';
import { useWeather } from '../context/WeatherContext';
import { ChevronDown, ChevronUp, BarChart2, Table } from 'lucide-react';

const WeatherDisplay = React.memo(() => {
  console.log('WeatherDisplay rendering');
  const { weatherData, coordinates, dateRange } = useWeather();
  const [activeTab, setActiveTab] = useState('graph');
  const [isExpanded, setIsExpanded] = useState(true);

  if (!weatherData) return null;

  const { latitude, longitude } = coordinates;
  const { startDate, endDate } = dateRange;
  
  const locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  const dateRangeText = `${startDate} to ${endDate}`;

  return (
    <div className="card">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 flex justify-between items-center border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Historical Weather Data
          </h2>
          <p className="text-sm text-gray-600">
            {locationName} • {dateRangeText}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <>
          <div className="border-b border-gray-200">
            <div className="flex px-4">
              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 flex items-center ${
                  activeTab === 'graph'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('graph')}
              >
                <BarChart2 size={16} className="mr-2" />
                Graph View
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 flex items-center ${
                  activeTab === 'table'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('table')}
              >
                <Table size={16} className="mr-2" />
                Table View
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'graph' ? <WeatherGraph /> : <WeatherTable />}
          </div>
        </>
      )}
    </div>
  );
});

WeatherDisplay.displayName = 'WeatherDisplay';

export default WeatherDisplay;
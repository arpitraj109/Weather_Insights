import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useWeather } from '../context/WeatherContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherGraph = React.memo(() => {
  console.log('WeatherGraph rendering');
  const { weatherData } = useWeather();
  const [selectedVariable, setSelectedVariable] = useState('temperature_2m_max');
  
  if (!weatherData) return null;
  
  const variableOptions = useMemo(() => [
    { value: 'temperature_2m_max', label: 'Maximum Temperature' },
    { value: 'temperature_2m_min', label: 'Minimum Temperature' },
    { value: 'temperature_2m_mean', label: 'Mean Temperature' },
    { value: 'apparent_temperature_max', label: 'Maximum Apparent Temperature' },
    { value: 'apparent_temperature_min', label: 'Minimum Apparent Temperature' },
    { value: 'apparent_temperature_mean', label: 'Mean Apparent Temperature' }
  ], []);
  
  const getDataForVariable = useMemo(() => (variable) => {
    return {
      labels: weatherData.time,
      datasets: [
        {
          label: variableOptions.find(opt => opt.value === variable).label,
          data: weatherData[variable],
          borderColor: getColorForVariable(variable),
          backgroundColor: getBackgroundForVariable(variable),
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: getColorForVariable(variable),
          pointHoverRadius: 5,
          tension: 0.3,
          fill: true,
        }
      ]
    };
  }, [weatherData, variableOptions]);
  
  const getColorForVariable = (variable) => {
    const colors = {
      temperature_2m_max: 'rgb(239, 68, 68)',
      temperature_2m_min: 'rgb(59, 130, 246)',
      temperature_2m_mean: 'rgb(16, 185, 129)',
      apparent_temperature_max: 'rgb(249, 115, 22)',
      apparent_temperature_min: 'rgb(79, 70, 229)',
      apparent_temperature_mean: 'rgb(168, 85, 247)'
    };
    return colors[variable];
  };
  
  const getBackgroundForVariable = (variable) => {
    const colors = {
      temperature_2m_max: 'rgba(239, 68, 68, 0.1)',
      temperature_2m_min: 'rgba(59, 130, 246, 0.1)',
      temperature_2m_mean: 'rgba(16, 185, 129, 0.1)',
      apparent_temperature_max: 'rgba(249, 115, 22, 0.1)',
      apparent_temperature_min: 'rgba(79, 70, 229, 0.1)',
      apparent_temperature_mean: 'rgba(168, 85, 247, 0.1)'
    };
    return colors[variable];
  };
  
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}°C`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return value + '°C';
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.4,
        to: 0.3,
      }
    }
  }), []);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-medium text-gray-800 mb-2 md:mb-0">
          Temperature Trends
        </h3>
        <div className="flex items-center">
          <label htmlFor="variable-select" className="text-sm text-gray-600 mr-2">
            Data Variable:
          </label>
          <select
            id="variable-select"
            value={selectedVariable}
            onChange={(e) => setSelectedVariable(e.target.value)}
            className="text-sm border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {variableOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="h-80">
        <Line 
          data={getDataForVariable(selectedVariable)} 
          options={options} 
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <p>
          This graph shows the {variableOptions.find(opt => opt.value === selectedVariable).label.toLowerCase()} 
          for the selected date range. Use the dropdown above to view different temperature metrics.
        </p>
      </div>
    </div>
  );
});

WeatherGraph.displayName = 'WeatherGraph';

export default WeatherGraph;
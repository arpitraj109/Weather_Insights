import React, { useState, useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const WeatherTable = React.memo(() => {
  console.log('WeatherTable rendering');
  const { weatherData } = useWeather();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  if (!weatherData) return null;
  
  const headers = useMemo(() => [
    { id: 'date', label: 'Date' },
    { id: 'temperature_2m_max', label: 'Max Temp (°C)' },
    { id: 'temperature_2m_min', label: 'Min Temp (°C)' },
    { id: 'temperature_2m_mean', label: 'Mean Temp (°C)' },
    { id: 'apparent_temperature_max', label: 'Max Apparent Temp (°C)' },
    { id: 'apparent_temperature_min', label: 'Min Apparent Temp (°C)' },
    { id: 'apparent_temperature_mean', label: 'Mean Apparent Temp (°C)' },
  ], []);
  
  const rows = useMemo(() => weatherData.time.map((date, index) => {
    const row = { date };
    headers.slice(1).forEach(header => {
      row[header.id] = weatherData[header.id][index];
    });
    return row;
  }), [weatherData, headers]);
  
  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const currentRows = rows.slice(startIndex, endIndex);
  
  const goToPage = (page) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
  };
  
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  
  const formatValue = (value, columnId) => {
    if (columnId === 'date') return value;
    return value.toFixed(1);
  };
  
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {headers.map(header => (
                  <td
                    key={`${rowIndex}-${header.id}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {formatValue(row[header.id], header.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex items-center mb-4 md:mb-0">
          <label className="mr-2 text-sm text-gray-700">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="text-sm border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {[10, 20, 50].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="ml-4 text-sm text-gray-700">
            Showing {startIndex + 1}-{endIndex} of {totalRows} rows
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className={`p-1 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="First page"
          >
            <ChevronsLeft size={20} />
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-sm text-gray-700 px-2">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </span>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-1 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`p-1 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Last page"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
});

WeatherTable.displayName = 'WeatherTable';

export default WeatherTable;
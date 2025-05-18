// Validation utilities for form inputs

export const validateCoordinates = (latitude, longitude) => {
  const errors = {};
  
  // Check if latitude is provided
  if (!latitude || latitude.trim() === '') {
    errors.latitude = 'Latitude is required';
  } else {
    // Check if latitude is a valid number
    const latValue = parseFloat(latitude);
    if (isNaN(latValue)) {
      errors.latitude = 'Latitude must be a number';
    } 
    // Check if latitude is in valid range (-90 to 90)
    else if (latValue < -90 || latValue > 90) {
      errors.latitude = 'Latitude must be between -90 and 90';
    }
  }
  
  // Check if longitude is provided
  if (!longitude || longitude.trim() === '') {
    errors.longitude = 'Longitude is required';
  } else {
    // Check if longitude is a valid number
    const longValue = parseFloat(longitude);
    if (isNaN(longValue)) {
      errors.longitude = 'Longitude must be a number';
    } 
    // Check if longitude is in valid range (-180 to 180)
    else if (longValue < -180 || longValue > 180) {
      errors.longitude = 'Longitude must be between -180 and 180';
    }
  }
  
  return errors;
};

export const validateDateRange = (startDate, endDate) => {
  const errors = {};
  
  // Check if start date is provided
  if (!startDate) {
    errors.startDate = 'Start date is required';
  }
  
  // Check if end date is provided
  if (!endDate) {
    errors.endDate = 'End date is required';
  }
  
  // Check if end date is after start date
  if (startDate && endDate && startDate > endDate) {
    errors.endDate = 'End date must be after start date';
  }
  
  // Check if date range is not too large (to prevent excessive API calls)
  if (startDate && endDate) {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 366) {
      errors.startDate = 'Date range should not exceed one year';
    }
  }
  
  return errors;
};
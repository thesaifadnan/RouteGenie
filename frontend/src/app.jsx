import React, { useState } from 'react';
import DeliveryForm from './components/DeliveryForm';
import RouteText from './components/RouteText';
import AlgorithmComparison from './components/AlgorithmControls/AlgorithmComparison';
import { locations } from './utils/graph';
import './App.css';

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleRouteCalculated = async (formData) => {
    console.log("Form data received:", formData);
    
    if (!formData.source || typeof formData.source !== 'string') {
      throw new Error('Invalid source location format');
    }
  
    if (!Array.isArray(formData.stops) || formData.stops.some(stop => typeof stop !== 'string')) {
      throw new Error('Invalid stops format - expected location names');
    }
  
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5001/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: formData.source,
          stops: formData.stops,
          weight: formData.weight,
          algorithm: formData.algorithm || 'auto' // Ensure algorithm is always sent
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Validate response structure
      const requiredFields = ['path', 'distance', 'time', 'vehicle', 'algorithm'];
      for (const field of requiredFields) {
        if (data[field] === undefined) {
          throw new Error(`Missing ${field} in response`);
        }
      }

      if (!data.path || !Array.isArray(data.path)) {
        throw new Error('Invalid response format from server');
      }
      
      setResult(data);
      setFormData(formData); // Store for comparison
    } catch (error) {
      console.error('Route calculation failed:', {
        error,
        timestamp: new Date().toISOString(),
        formData
      });
      setError(error.message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>RouteGenie 🧞‍♂️</h1>
      <p className="subtitle">Intelligent Delivery Route Planner for Dehradun</p>
      
      <div className="content-area">
        <div className="form-section">
          <DeliveryForm 
            locations={locations} 
            onRouteCalculated={handleRouteCalculated}
            isLoading={isLoading}
          />
        </div>
        
        <div className="results-section">
          {isLoading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Finding optimal route...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <h3>Error:</h3>
              <p>{error}</p>
              {error.includes('CORS') && (
                <p>Please ensure the backend server is running on port 5001</p>
              )}
            </div>
          )}
          
          {result && (
            <>
              <RouteText result={result} />
              <AlgorithmComparison
                source={formData.source}
                stops={formData.stops}
                weight={formData.weight}
                vehicle={result.vehicle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
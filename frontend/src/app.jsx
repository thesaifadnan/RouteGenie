import React, { useState } from 'react';
import DeliveryForm from './components/DeliveryForm';
import RouteText from './components/RouteText';
import AlgorithmComparison from './components/AlgorithmControls/AlgorithmComparison';
import { locations } from './utils/graph';
import './App.css';

export default function App() {
  const locationNames = Object.keys(locations); // Get array of location names
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleRouteCalculated = async (formData) => {
    setIsLoading(true);
    setError(null);
    setFormData(formData);

    try {
      // Validate stops are valid location names
      const invalidStops = formData.stops.filter(
        stop => !locationNames.includes(stop)
      );
      if (invalidStops.length > 0) {
        throw new Error(`Invalid stops: ${invalidStops.join(', ')}`);
      }

      const response = await fetch('http://localhost:5001/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: formData.source,
          stops: formData.stops,
          weight: Number(formData.weight),
          algorithm: formData.algorithm || 'auto'
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Route calculation failed');
      }

      // Validate response structure
      if (!data.path || !data.algorithm) {
        throw new Error('Invalid response from server');
      }

      setResult(data);
    } catch (error) {
      console.error('Error:', error);
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
            locations={locationNames} 
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
            </div>
          )}
          
          {result && (
            <>
              <RouteText result={result} />
              <AlgorithmComparison
                source={formData?.source}
                stops={formData?.stops}
                weight={formData?.weight}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
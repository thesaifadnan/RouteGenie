import React, { useState } from 'react';
import { optimizeRoute } from '../../services/api';
import './AlgorithmControls.css';

export default function AlgorithmComparison({ source, stops, weight, vehicle }) {
  const [results, setResults] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState(null);

  const compareAlgorithms = async () => {
    if (!source || stops.length === 0) {
      setError('Please set source and stops first');
      return;
    }
  
    setIsComparing(true);
    setError(null);
    
    try {
      const algorithms = ['auto', 'dijkstra', 'astar', 'greedy'];
      const comparisonPromises = algorithms.map(algo => 
        fetch('http://localhost:5001/api/optimize', { // Full backend URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            source, 
            stops, 
            weight, 
            algorithm: algo 
          })
        }).then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
      );
  
      const comparisonResults = await Promise.all(comparisonPromises);
      setResults(comparisonResults);
    } catch (err) {
      setError(`Comparison failed: ${err.message}`);
      console.error('Algorithm comparison error:', err);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="comparison-container">
      <button 
        onClick={compareAlgorithms} 
        disabled={isComparing}
        className="compare-button"
      >
        {isComparing ? 'Comparing...' : 'Compare Algorithms'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {results.length > 0 && (
        <div className="results-table">
          <h3>Algorithm Comparison</h3>
          <table>
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Distance (km)</th>
                <th>Time (mins)</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={idx} className={result.algorithm.includes('Auto') ? 'recommended' : ''}>
                  <td>{result.algorithm}</td>
                  <td>{result.distance.toFixed(2)}</td>
                  <td>{result.time}</td>
                  <td className="path-cell">
                    {result.path.slice(0, 3).join(' → ')}
                    {result.path.length > 3 && ' → ... → ' + result.path.slice(-1)[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
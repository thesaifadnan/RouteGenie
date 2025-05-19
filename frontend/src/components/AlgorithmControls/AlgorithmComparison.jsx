import React, { useState } from 'react';
import { optimizeRoute } from '../../services/api';
import './AlgorithmControls.css';
export default function AlgorithmComparison({ source, stops, weight }) {
  const [results, setResults] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState(null);

  const compareAlgorithms = async () => {
    try {
      // Validate inputs first
      if (!source || !stops?.length || !weight) {
        throw new Error('Please calculate a valid route first');
      }

      setIsComparing(true);
      setError(null);

      const algorithms = ['auto', 'dijkstra', 'astar', 'greedy'];
      
      const comparisonResults = await Promise.all(
        algorithms.map(async (algorithm) => {
          const response = await optimizeRoute({
            source,
            stops: [...new Set(stops)], // Remove duplicates
            weight,
            algorithm
          });
          return response;
        })
      );

      setResults(comparisonResults.filter(r => !r.error));
      
    } catch (error) {
      setError(error.message);
      console.error('Comparison error:', error);
    } finally {
      setIsComparing(false);
    }
  };

  // Safe array access for stops
  const safeStops = Array.isArray(stops) ? stops : [];

  return (
    <div className="algorithm-comparison">
      <button className='compare-btn'
        onClick={compareAlgorithms} 
        disabled={isComparing || !source || !safeStops.length}
      >
        {isComparing ? 'Comparing...' : 'Compare Algorithms'}
      </button>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Distance (km)</th>
              <th>Time (mins)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.algorithm || 'Greedy'}</td>
                <td>{result.distance?.toFixed(2) || 'N/A'}</td>
                <td>{result.time || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
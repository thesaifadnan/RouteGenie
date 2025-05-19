// import './RouteText.css';
import React from 'react';
export default function RouteText({ result }) {
    if (!result) return null;
  
    return (
      <div className="route-results">
        <h3>Optimized Path : {result.algorithm}</h3>
        <div className="path-visualization">
          {result.path.map((loc, i) => (
            <React.Fragment key={i}>
              <span className="location">{loc}</span>
              {i < result.path.length - 1 && (
                <span className="arrow">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="metrics">
          <div className="metric-box">
            <span className="label">Distance:</span>
            <span className="value">{result.distance.toFixed(1)} km</span>
          </div>
          <div className="metric-box">
            <span className="label">Time:</span>
            <span className="value">{result.time} mins</span>
          </div>
          <div className="metric-box">
            <span className="label">Vehicle:</span>
            <span className="value">{result.vehicle} </span>
          </div>
        </div>
      </div>
    );
  }
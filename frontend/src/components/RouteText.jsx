export default function RouteText({ result }) {
    if (!result) return null;
  
    return (
      <div className="route-results">
        <h3>Optimized Route</h3>
        <div className="route-path">
          {result.path.map((loc, i) => (
            <span key={i}>
              {loc}
              {i < result.path.length - 1 && ' → '}
            </span>
          ))}
        </div>
        
        <div className="route-metrics">
          <div className="metric">
            <span className="label">Distance:</span>
            <span className="value">{result.distance.toFixed(1)} km</span>
          </div>
          <div className="metric">
            <span className="label">Time:</span>
            <span className="value">{result.time} minutes</span>
          </div>
          <div className="metric">
            <span className="label">Vehicle:</span>
            <span className="value">{result.vehicle}</span>
          </div>
        </div>
      </div>
    );
  }
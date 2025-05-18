import React, { useState } from 'react';
import { AlgorithmSelector } from './AlgorithmControls';
import './DeliveryForm.css';

export default function DeliveryForm({ locations, onRouteCalculated, isLoading }) {
  const [source, setSource] = useState('');
  const [stops, setStops] = useState([]);
  const [weight, setWeight] = useState('');
  const [algorithm, setAlgorithm] = useState('auto');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      source,
      stops: stops.filter(Boolean),
      weight: Number(weight),
      algorithm
    };
    onRouteCalculated(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-form">
      <div className="form-group">
        <label>Source:</label>
        <select 
          value={source} 
          onChange={(e) => setSource(e.target.value)}
          required
        >
          <option value="">Select source</option>
          {Object.keys(locations).map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Stops:</label>
        {stops.map((stop, i) => (
          <div key={i} className="stop-row">
            <select
              value={stop}
              onChange={(e) => {
                const newStops = [...stops];
                newStops[i] = e.target.value;
                setStops(newStops);
              }}
              required
            >
              <option value="">Select stop</option>
              {Object.keys(locations).map(loc => (
                <option key={loc} value={loc} disabled={loc === source || stops.includes(loc)}>
                  {loc}
                </option>
              ))}
            </select>
            <button 
              type="button" 
              onClick={() => setStops(stops.filter((_, idx) => idx !== i))}
              disabled={stops.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => setStops([...stops, ''])}
          disabled={Object.keys(locations).filter(loc => !stops.includes(loc) && loc !== source).length === 0}
        >
          Add Stop
        </button>
      </div>

      <div className="form-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min="0.1"
          step="0.1"
          required
        />
      </div>

      <AlgorithmSelector 
        selectedAlgorithm={algorithm}
        onChange={setAlgorithm}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Calculating...' : 'Optimize Route'}
      </button>
    </form>
  );
}
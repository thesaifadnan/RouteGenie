import React, { useState } from 'react';
import './DeliveryForm.css';

export default function DeliveryForm({ locations, onRouteCalculated, isLoading }) {
  const [source, setSource] = useState('');
  const [stops, setStops] = useState([]);
  const [weight, setWeight] = useState('');
  const [algorithm, setAlgorithm] = useState('auto');

  const availableStops = locations.filter(loc => loc !== source);

  const handleAddStop = () => {
    if (availableStops.length > stops.length) {
      setStops([...stops, availableStops[stops.length]]);
    }
  };

  const handleStopChange = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handleRemoveStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out any invalid or empty stops
    const validStops = stops.filter(stop => 
      stop && locations.includes(stop)
    );

    if (!source || validStops.length === 0) {
      alert('Please select source and at least one valid stop');
      return;
    }

    onRouteCalculated({
      source,
      stops: validStops,
      weight,
      algorithm
    });
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-form">
      <div className="form-group">
        <label>Source Location:</label>
        <select
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setStops([]); // Reset stops when source changes
          }}
          required
        >
          <option value="">Select source</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Delivery Stops:</label>
        {stops.map((stop, index) => (
          <div key={index} className="stop-row">
            <select
              value={stop}
              onChange={(e) => handleStopChange(index, e.target.value)}
              required
            >
              <option value="">Select stop</option>
              {locations
                .filter(loc => loc !== source && !stops.includes(loc) || loc === stop)
                .map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
            </select>
            <button
              type="button"
              className="remove-stop"
              onClick={() => handleRemoveStop(index)}
            >
              × Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-stop"
          onClick={handleAddStop}
          disabled={stops.length >= availableStops.length}
        >
          + Add Stop
        </button>
      </div>

      <div className="form-group">
        <label>Package Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="auto">Auto Select</option>
          <option value="dijkstra">Dijkstra's</option>
          <option value="astar">A* Search</option>
          <option value="greedy">Greedy</option>
        </select>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading || !source || stops.length === 0}
      >
        {isLoading ? 'Calculating...' : 'Optimize Route'}
      </button>
    </form>
  );
}
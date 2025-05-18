import React from 'react';
import './AlgorithmControls.css'; // We'll create this

const algorithms = [
  { value: 'auto', label: 'Auto Select (Recommended)', description: 'Automatically chooses the best algorithm' },
  { value: 'dijkstra', label: "Dijkstra's", description: 'Guarantees shortest path but slower for many stops' },
  { value: 'astar', label: 'A* Search', description: 'Faster with good heuristics' },
  { value: 'greedy', label: 'Greedy', description: 'Fast but may not be optimal' }
];

export default function AlgorithmSelector({ selectedAlgorithm, onChange }) {
  return (
    <div className="algorithm-selector">
      <label htmlFor="algorithm-select">Routing Algorithm:</label>
      <select
        id="algorithm-select"
        value={selectedAlgorithm}
        onChange={(e) => onChange(e.target.value)}
        className="algorithm-dropdown"
      >
        {algorithms.map((algo) => (
          <option key={algo.value} value={algo.value} title={algo.description}>
            {algo.label}
          </option>
        ))}
      </select>
    </div>
  );
}
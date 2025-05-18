import { graph } from './graph';

export const dijkstra = (start, end) => {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));
  
  // Initialize distances
  Object.keys(graph).forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
  });

  while (unvisited.size > 0) {
    // Get node with smallest distance
    let current = null;
    unvisited.forEach(node => {
      if (current === null || distances[node] < distances[current]) {
        current = node;
      }
    });

    // Early exit if reached end
    if (current === end) break;

    // Update neighbor distances
    Object.entries(graph[current]).forEach(([neighbor, distance]) => {
      const totalDistance = distances[current] + distance;
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previous[neighbor] = current;
      }
    });

    unvisited.delete(current);
  }

  // Reconstruct path
  const path = [];
  let current = end;
  while (current !== start) {
    path.unshift(current);
    current = previous[current];
    if (current === undefined) return null; // No path exists
  }
  path.unshift(start);

  return {
    path,
    distance: distances[end],
    algorithm: "Dijkstra's"
  };
};
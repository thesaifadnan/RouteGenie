import { graph, locations } from './graph.js';

const vehicleSpeeds = { Bike: 20, Van: 40, Truck: 30 };

// 1. Dijkstra's Algorithm (Guaranteed shortest path)
function dijkstra(start, end) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  // Initialize
  Object.keys(graph).forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
  });

  while (unvisited.size > 0) {
    const current = [...unvisited].reduce((min, node) => 
      distances[node] < distances[min] ? node : min
    );

    if (current === end) break;

    Object.entries(graph[current]).forEach(([neighbor, weight]) => {
      const total = distances[current] + weight;
      if (total < distances[neighbor]) {
        distances[neighbor] = total;
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
    if (!current) return null; // No path exists
  }
  path.unshift(start);

  return { path, distance: distances[end] };
}

// 2. A* Algorithm (Optimized with heuristic)
function aStar(start, end) {
  const openSet = new Set([start]);
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  Object.keys(graph).forEach(node => {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  });
  gScore[start] = 0;
  fScore[start] = haversineDistance(start, end);

  while (openSet.size > 0) {
    const current = [...openSet].reduce((min, node) => 
      fScore[node] < fScore[min] ? node : min
    );

    if (current === end) {
      const path = [current];
      let node = current;
      while (node !== start) {
        node = cameFrom[node];
        path.unshift(node);
      }
      return { path, distance: gScore[end] };
    }

    openSet.delete(current);

    Object.entries(graph[current]).forEach(([neighbor, weight]) => {
      const tentativeGScore = gScore[current] + weight;
      if (tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = gScore[neighbor] + haversineDistance(neighbor, end);
        if (!openSet.has(neighbor)) openSet.add(neighbor);
      }
    });
  }
  return null;
}

// 3. Greedy TSP Algorithm (Fast approximation)
function greedyTSP(source, stops) {
  const unvisited = new Set(stops);
  let current = source;
  const path = [current];
  let totalDistance = 0;

  while (unvisited.size > 0) {
    let nearest = null;
    let minDist = Infinity;

    // Only consider unvisited stops
    for (const stop of unvisited) {
      const segment = dijkstra(current, stop);
      if (segment && segment.distance < minDist) {
        nearest = stop;
        minDist = segment.distance;
      }
    }

    if (!nearest) break;

    const segment = dijkstra(current, nearest);
    path.push(...segment.path.slice(1));
    totalDistance += segment.distance;
    unvisited.delete(nearest);
    current = nearest;
  }

  return { path, distance: totalDistance };
}

// 4. Brute Force (Optimal for ≤4 stops)
function bruteForceTSP(source, stops) {
  const permute = (arr) => {
    if (arr.length <= 1) return [arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const perm of permute(remaining)) {
        result.push([current, ...perm]);
      }
    }
    return result;
  };

  const allRoutes = permute(stops);
  let bestPath = null;
  let minDistance = Infinity;

  for (const permutation of allRoutes) {
    let current = source;
    let path = [current];
    let totalDistance = 0;
    let valid = true;

    for (const stop of permutation) {
      const segment = dijkstra(current, stop);
      if (!segment) {
        valid = false;
        break;
      }
      path = path.concat(segment.path.slice(1));
      totalDistance += segment.distance;
      current = stop;
    }

    if (valid && totalDistance < minDistance) {
      minDistance = totalDistance;
      bestPath = path;
    }
  }

  return bestPath ? { 
    path: bestPath, 
    distance: minDistance,
    algorithm: "Brute Force" 
  } : null;
}

// Helper Functions
function haversineDistance(loc1, loc2) {
  const R = 6371;
  const lat1 = locations[loc1].lat * Math.PI/180;
  const lat2 = locations[loc2].lat * Math.PI/180;
  const dLat = (locations[loc2].lat - locations[loc1].lat) * Math.PI/180;
  const dLon = (locations[loc2].lng - locations[loc1].lng) * Math.PI/180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Main Router
export function optimizeRoute(source, stops, vehicle, algorithm = 'auto') {
  try {
    // Validate
    if (!source || !stops) throw new Error("Missing source or stops");
    if (!graph[source]) throw new Error(`Invalid source: ${source}`);
    if (stops.some(s => !graph[s])) throw new Error("Invalid stops detected");

    let result;
    switch (algorithm) {
      case 'dijkstra':
        result = sequentialDijkstra(source, stops);
        result.algorithm = "Dijkstra";
        break;
      case 'astar':
        result = aStarTSP(source, stops);
        result.algorithm = "A*";
        break;
      case 'greedy':
        result = greedyTSP(source, stops);
        break;
      default: // auto
        result = stops.length <= 4 
          ? bruteForceTSP(source, stops) || greedyTSP(source, stops)
          : greedyTSP(source, stops);
        result.algorithm = algorithm === 'auto' ? "Auto-Selected" : result.algorithm;
    }

    if (!result?.path) throw new Error("No valid path found");

    return {
      path: result.path,
      distance: result.distance,
      time: Math.round((result.distance / vehicleSpeeds[vehicle]) * 60),
      vehicle,
      algorithm: result.algorithm
    };

  } catch (error) {
    return { error: error.message };
  }
}

// Helper: Multi-stop routing
function sequentialDijkstra(source, stops) {
  let path = [source];
  let totalDistance = 0;
  let current = source;

  for (const stop of stops) {
    const segment = dijkstra(current, stop);
    if (!segment) throw new Error(`No path from ${current} to ${stop}`);
    path = path.concat(segment.path.slice(1));
    totalDistance += segment.distance;
    current = stop;
  }

  return { path, distance: totalDistance };
}

function aStarTSP(source, stops) {
  let path = [source];
  let totalDistance = 0;
  let current = source;

  for (const stop of stops) {
    const segment = aStar(current, stop);
    if (!segment) throw new Error(`No path from ${current} to ${stop}`);
    path = path.concat(segment.path.slice(1));
    totalDistance += segment.distance;
    current = stop;
  }

  return { path, distance: totalDistance };
}
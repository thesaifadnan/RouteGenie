import express from 'express';
import cors from 'cors';
import { optimizeRoute } from './utils/algorithms.js';
import { graph } from './utils/graph.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Route
app.post('/api/optimize', async (req, res) => {
  try {
    const { source, stops = [], weight, algorithm = 'auto' } = req.body;

    // Validate input types
    if (typeof source !== 'string' || !Array.isArray(stops)) {
      return res.status(400).json({
        error: 'Invalid input format',
        details: {
          source: typeof source,
          stops: Array.isArray(stops) ? 'array' : typeof stops
        }
      });
    }

    // Validate locations exist in graph
    const allLocations = [source, ...stops];
    const invalidLocations = allLocations.filter(loc => !graph[loc]);
    if (invalidLocations.length > 0) {
      return res.status(400).json({
        error: 'Invalid locations provided',
        invalidLocations,
        validLocations: Object.keys(graph)
      });
    }

    const vehicle = weight <= 50 ? 'Bike' : weight <= 100 ? 'Van' : 'Truck';
    const result = await optimizeRoute(source, stops, vehicle, algorithm);

    if (result.error) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Route optimization error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    graphNodes: Object.keys(graph).length,
    graphEdges: Object.values(graph).reduce((sum, edges) => sum + Object.keys(edges).length, 0)
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
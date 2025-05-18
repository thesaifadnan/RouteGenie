import express from 'express';
import cors from 'cors';
import { optimizeRoute } from './utils/algorithms.js';
import { graph } from './utils/graph.js';

const app = express();

// ======================
// 1. Middleware Setup
// ======================
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Handle preflight requests
app.options('*', cors());

// JSON body parsing
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', {
    'content-type': req.headers['content-type'],
    origin: req.headers.origin
  });
  console.log('Body:', req.body);
  next();
});

// ======================
// 2. Route Handlers
// ======================
app.post('/api/optimize', async (req, res) => {
  try {
    const { source, stops, weight, algorithm = 'auto' } = req.body; // Add algorithm with default
    
    // Validation
    if (!source || !stops || !weight) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const vehicle = weight <= 50 ? 'Bike' : weight <= 100 ? 'Van' : 'Truck';
    const result = optimizeRoute(source, stops, vehicle, algorithm);
    if (!result) {
      return res.status(400).json({ 
        success: false, 
        error: 'No valid path found' 
      });
    }

    res.json({
      success: true,
      ...result, // Ensure this contains all required fields
      metadata: {
        calculatedAt: new Date().toISOString(),
        algorithmUsed: result.algorithm // Make sure this exists
      }
    });

  } catch (error) {
    console.error('Route optimization error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    system: {
      graphNodes: Object.keys(graph).length,
      graphEdges: Object.values(graph).reduce((sum, edges) => sum + Object.keys(edges).length, 0),
      memoryUsage: process.memoryUsage().rss / (1024 * 1024) + ' MB'
    }
  });
});

// ======================
// 3. Server Startup
// ======================
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on http://localhost:${PORT}
  ========================================
  Available Routes:
  • POST /api/optimize - Calculate delivery route
  • GET  /api/health   - System health check
  `);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});
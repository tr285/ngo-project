const app = require('../server/src/app');
const connectDB = require('../server/src/config/database');

// Initialize database connection for serverless environment
connectDB();

module.exports = app;
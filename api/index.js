const app = require('../server/src/app');
const connectDB = require('../server/src/config/database');
const mongoose = require('mongoose');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected && mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('Database connection failed:', error);
      // Even if DB fails, allow app to handle the request (it might return 500)
    }
  }
  return app(req, res);
};

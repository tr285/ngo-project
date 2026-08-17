const mongoose = require('mongoose');
const env = require('./env');

let mongoServer;

const connectDB = async () => {
  try {
    let uri = env.mongodbUri;
    
    // Always use temporary DB as requested
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`Using temporary MongoDB at ${uri}`);
    } catch (e) {
      console.warn('mongodb-memory-server not installed or failed to start, using default URI');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error(`MongoDB error: ${error.message}`);
});

module.exports = connectDB;

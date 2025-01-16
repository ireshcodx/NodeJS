const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('libraryDB'); //! Use the database name
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the app if connection fails
  }
};

// Getter for the database instance
const getDB = () => {
  if (!db) throw new Error('Database not initialized. Call connectDB first.');
  return db;
};

module.exports = { connectDB, getDB };
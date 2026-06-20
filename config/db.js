const mongoose = require('mongoose');

const connectdb = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ MONGO_URI is not set in environment variables. Database storage is disabled.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ✅');
  } catch (error) {
    console.error('⚠️ DB Connection Error (Database storage disabled):', error.message);
  }
};

module.exports = connectdb;
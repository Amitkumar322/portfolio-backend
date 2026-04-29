const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectdb = require('./config/db');

const app = express();

connectdb();

// ✅ CHANGE 1: CORS update karo
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-portfolio.netlify.app'  // ← Netlify deploy hone ke baad real URL daalna
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api', require('./Routes/Contactroutes'));

// ✅ CHANGE 2: PORT env variable se lo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/hotels', async (req, res) => {
    try {
      const hotelName = req.query.name || 'Hilton'; // Default hotel name if not provided
      const apiKey = process.env.MAKCORPS_API_KEY;
      const url = `https://api.makcorps.com/mapping?api_key=${apiKey}&name=${hotelName}`;
  
      const response = await axios.get(url);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(response.data, null, 2)); // Pretty-print JSON response
    } catch (error) {
      console.error('Error fetching hotels:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch hotel data' });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

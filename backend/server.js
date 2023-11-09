
const port = 8000
const express =require('express')
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config()
app.use(cors())
app.use(bodyParser.json());


app.get('/flight',async (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
        params: {
          fromId: 'BOM.AIRPORT',
          toId: 'DEL.AIRPORT',
          departDate: '2023-11-22',
          pageNo: '1',
          adults: '1',
          children: '0,17',
          currency_code: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.status);
          res.json(response.data)
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching flight data' });

      }
})

app.post('/search', async (req, res) => {
  const { fromId, toId, departDate } = req.body;

  const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
          fromId: `${fromId.toUpperCase()}.AIRPORT`,
          toId: `${toId.toUpperCase()}.AIRPORT`,
          departDate,
          pageNo: '1',
          adults: '1',
          children: '0,17',
          currency_code: 'USD',
      },
      headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
      },
  };

  try {
      const response = await axios.request(options);
      console.log(response.data.status);
      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching flight data' });
  }
});


app.listen(port, () => console.log('port', port))
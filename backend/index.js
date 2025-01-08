const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'password',
  database: 'textsdb',
  port: 5432,
});

app.get('/', async (req, res) => {
  res.send('Hola, esta es la API :)');
});

app.get('/api/texts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM texts ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching texts:', error);
    res.status(500).send('Error fetching texts');
  }
});


app.post('/api/insert', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('No text provided');
  }

  try {
    await pool.query('INSERT INTO texts (content) VALUES ($1)', [text]);
    res.status(200).send('Text inserted successfully');
  } catch (error) {
    console.error('Error inserting text:', error);
    res.status(500).send('Error inserting text');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

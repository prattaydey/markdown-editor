const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { configDotenv } = require('dotenv');
const app = express();

configDotenv();

// Middleware
app.use(express.json({ limit: "50mb" })); // to parse JSON data in req.body
app.use(express.urlencoded({extended: true})); // to parse form data in the req.body
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

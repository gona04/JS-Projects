const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PANTRY_ID = process.env.PANTRY_ID;
const PANTRY_BASKET_NAME = `test`

const PANTRY_API_BASE_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket`;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname)));

app.use(express.json());

app.get('/:basketName', async(req, res) => {
    const {basketName} = req.params;
    try {
        const response = await axios.get(`${PANTRY_API_BASE_URL}/${basketName}`);
        res.json(response.data);
    } catch(error) {
        res.status(500).json({error: error.message})
    }
})

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Correctly resolve the absolute path
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
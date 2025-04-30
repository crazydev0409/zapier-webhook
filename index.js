// backend/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;  // You can set any port here

// Middleware to handle JSON body
app.use(express.json());
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Route to handle requests from the frontend
app.post('/zapier-webhook', async (req, res) => {
  const { zapierUrl, ...formData } = req.body;

  if (!zapierUrl) {
    return res.status(400).json({ error: 'zapierUrl is required' });
  }

  try {
    // Forward data to Zapier Webhook
    const response = await axios.post(zapierUrl, formData);
    res.status(200).json(response.data); // Return Zapier's response to the frontend
  } catch (error) {
    console.error('Error forwarding data to Zapier:', error);
    res.status(500).json({ error: 'Failed to forward data to Zapier' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

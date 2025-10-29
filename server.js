import { inject } from "@vercel/analytics"

inject();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function logPayload(endpoint, payload, headers = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${endpoint} received:`);
  console.log('Headers:', JSON.stringify(headers, null, 2));
  console.log('Payload:', JSON.stringify(payload, null, 2));
  console.log('---');
}

app.post('/webhook', (req, res) => {
  try {
    const payload = req.body;
    const headers = req.headers;

    logPayload('/webhook', payload, headers);

    res.status(200).json({
      status: 'success',
      message: 'Alert received and logged',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Alert Webhook Server',
    endpoints: {
      'POST /webhook': 'Receive and log alert payloads',
      'GET /health': 'Health check'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Alert webhook server listening on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

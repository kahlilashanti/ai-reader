const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const PORT = 5050;

dotenv.config();

// Escape quotes for safety
function jsEscape(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Inject API key and voice ID into frontend
app.get('/config.js', (req, res) => {
  res.type('application/javascript').send(`
    const CONFIG = {
      API_KEY: "${jsEscape(process.env.ELEVEN_API_KEY || '')}",
      VOICE_ID: "${jsEscape(process.env.ELEVEN_VOICE_ID || '')}"
    };
  `);
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AI Reader running at http://localhost:${PORT}`);
});

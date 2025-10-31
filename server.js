const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle all routes by serving index.html (for SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`StudentOS is running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});
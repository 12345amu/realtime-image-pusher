const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const wss = new WebSocket({ server });
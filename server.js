const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const fs = require('fs'); 

const app = express();
const PORT = 3000;

const inputFolder = "C:\\Users\\HP\\OneDrive\\Pictures\\Screenshots";
const outputFolder = path.join(__dirname, 'output');

if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(outputFolder));

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const wss = new WebSocket({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected');

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

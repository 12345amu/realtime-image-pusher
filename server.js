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

const copiedFiles = new Set();
function getImages(dir) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    : [];
}
function copyNextImage() {
  const images = getImages(inputFolder).filter(f => !copiedFiles.has(f));
  if (images.length === 0) {
    console.log('No new images to copy');
    return;
  }

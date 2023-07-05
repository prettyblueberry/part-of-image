const express = require('express');
const https = require('https');

const app = express();

app.get('/image.png', (req, res) => {
  // const url = req.query.url;
  const url = 'https://placehold.co/600x400/png';
  const proxyReq = https.get(url, (proxyRes) => {
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    res.status(500).send('Error downloading image');
  });
});
app.get('/', (req, res) => {
  res.send("<img src='/image.png'>");
});
app.listen(3000);

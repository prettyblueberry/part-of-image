const express = require('express');
const https = require('https');
const { Buffer } = require('node:buffer');

// image path: You can change url of image
const imageURL = 'https://placehold.co/600x400/000000/FFFFFF/jpeg';

// size limit 2kb
const sizeLimit = 2048;

const app = express();

//image routing
app.get('/image', (req, res) => {
  //make a request
  const proxyReq = https.get(imageURL, (proxyRes) => {
    let data = Buffer.from([]);
    proxyRes.on('data', (chunk) => {
      if (data.length < sizeLimit) {
        data = Buffer.concat([data, chunk], data.length + chunk.length);
      } else {
        proxyRes.destroy();
      }
    });
    proxyRes.on('end', () => {
      // only 2kb
      if (data.length >= sizeLimit) res.send(data.subarray(0, sizeLimit));
      else res.send(data);
    });
  });

  proxyReq.on('error', (err) => {
    res.status(500).send('Error downloading image');
  });
});

//root routing: client html
app.get('/', (req, res) => {
  res.send("<img src='/image'>");
});

//host
app.listen(3000);

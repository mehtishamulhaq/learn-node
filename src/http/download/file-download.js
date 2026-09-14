const https = require('https');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/Cher';

const request = https.get(url, (res) => {
  const download = fs.createWriteStream('Cher.html');
  console.log('Dowload started');

  res.pipe(download);

  res.on('end', () => {
    console.log('Fiished');
  });
});

request.end();

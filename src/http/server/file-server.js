const { createServer } = require('http');
const { createReadStream } = require('fs');

const sendFile = (res, status, type, file) => {
  res.writeHead(status, { 'Content-Type': type });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  switch (req.url) {
    case '/':
      sendFile(res, 200, 'text/html', './home-page.html');
      break;
    case '/sample-image':
      sendFile(res, 200, 'image/png', './sample-image.png');
      break;
    case '/styles':
      sendFile(res, 200, 'text/css', './styles.css');
      break;
    default:
      sendFile(res, 200, 'text/html', './home-page.html');
  }
}).listen(3001);

console.log('server listening on port 3001');

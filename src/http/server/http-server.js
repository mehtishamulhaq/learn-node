const { createServer } = require('http');

createServer((req, res) => {
  res.writeHead(200, { 'content-Type': 'text/html' });
  res.end(`
        <!DOCTYPE html>
        <html>
            <body>
                <h1>My Web server!</h1>
                <p> Created a web server with node js</p>
                <p>${req.method} request made for ${req.url}</p>
            </body>
        </html>
        `);
}).listen(3000);

console.log('App is listeing on port 3000');

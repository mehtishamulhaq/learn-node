import { createServer } from 'http';
import data from '../../constants/users.json';

createServer((req, res) => {
  console.log('URL', req.url);
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(data));
  } else {
    const id = Number(req.url.split('/').pop());
    const user = data.find((user) => user.id === id);

    if (!user) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User not found!' }));
    }

    res.statusCode = 200;
    res.end(JSON.stringify(user));
  }
}).listen(3002);

console.log('server is running on 3002');

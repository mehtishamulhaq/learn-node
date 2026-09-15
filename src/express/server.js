import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import users from '../constants/users.json' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFilePath = path.join(__dirname, '../constants/users.json');

const app = express();

app.use('/', express.static('./site'));

app.get('/data', (req, res) => {
  res.json(users);
});

app.post('/data', bodyParser.json(), (req, res) => {
  users.push(req.body);
  save();
  res.json({
    status: 'success',
    user: req.body,
  });
});

app.delete('/data/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  users.splice(index, 1);
  save();

  res.json({
    status: 'success',
    removed: id,
    totalUsers: users.length,
  });
});

const save = () => {
  fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      throw err;
    }
  });
};

app.listen(3000, () => console.log('app is listening at 3000'));

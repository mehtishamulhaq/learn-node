import { Router } from 'express';
import bodyParser from 'body-parser';
import { save } from './utils.js';
import users from '../constants/users.json' assert { type: 'json' };

const router = new Router();

router.get('/data', (req, res) => {
  res.json(users);
});

router.post('/data', bodyParser.json(), (req, res) => {
  users.push(req.body);
  save();
  res.json({
    status: 'success',
    user: req.body,
  });
});

router.delete('/data/:id', (req, res) => {
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

export default router;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import users from '../constants/users.json' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFilePath = path.join(__dirname, '../constants/users.json');

export const save = () => {
  fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      throw err;
    }
  });
};

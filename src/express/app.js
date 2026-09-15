import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use('/', express.static(path.join(__dirname, 'site')));
app.use('/', routes);

export default app;

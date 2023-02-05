import express, { Express } from 'express';
import { notImplemented } from './controllers/NotImplementedController';

const app: Express = express();
const PORT = 8091;

app.post('/api/students', notImplemented);
app.get('/api/students/:studentName', notImplemented);

app.listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});

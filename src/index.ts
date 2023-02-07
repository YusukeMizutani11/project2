import express, { Express } from 'express';
import {
  getAllStudents,
  createNewStudent,
  getStudentByName,
} from './controllers/StudentController';

const app: Express = express();
const PORT = 8091;

app.use(express.json());

app.get('/', getAllStudents);

app.post('/students', createNewStudent);
app.get('/students/:studentName', getStudentByName);

app.listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});

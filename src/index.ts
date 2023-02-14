import express, { Express } from 'express';
import {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
} from './controllers/StudentController';

const app: Express = express();
const PORT = 8091;

app.use(express.json());

app.get('/api', getAllStudents);
app.post('/api/students', createNewStudent);
app.get('/api/students/:studentName', getStudentByName);
app.get('/api/students/:studentName/finalExam', getFinalExamScores);
app.post('/api/students/:studentName/finalExam', calcFinalScore);
app.post('/api/students/:studentName/grades/:assignmentName', updateGrade);

app.listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});

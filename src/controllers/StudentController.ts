import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest;
  const didAddStudent = addStudent(studentData);

  if (!didAddStudent) {
    res.sendStatus(409);
    return;
  }

  res.sendStatus(201);
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }

  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;

  const student = getStudent(studentName);

  if (!student) res.sendStatus(404);
  else {
    const currentAve = student.currentAverage;
    const finalWeight = student.weights.finalExamWeight;

    const scoreForA: number = calculateFinalExamScore(currentAve, finalWeight, 90);
    const scoreForB: number = calculateFinalExamScore(currentAve, finalWeight, 80);
    const scoreForC: number = calculateFinalExamScore(currentAve, finalWeight, 70);
    const scoreForD: number = calculateFinalExamScore(currentAve, finalWeight, 60);

    const scores: FinalExamScores = {
      neededForA: scoreForA,
      neededForB: scoreForB,
      neededForC: scoreForC,
      neededForD: scoreForD,
    };

    res.json(scores);
  }
}

function calcFinalScore(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
  } else {
    // TODO: Get the grade data from the request body as the `AssignmentGrade` type
    const grades = req.body as AssignmentGrade;

    // TODO: Get the current average and weights from the student's data
    const currAve = student.currentAverage;
    const finalWeight = student.weights.finalExamWeight;

    const overallScore = (currAve * (100 - finalWeight) + finalWeight * grades.grade) / 100;
    // TODO: Calculate the final score that would receive using their current average and the hypothetical final exam grade.
    const letterGrade = getLetterGrade(overallScore);

    const studentScore: FinalGrade = {
      overallScore,
      letterGrade,
    };

    // TODO: Send back a JSON response containing their `overallScore` and `letterGrade.
    res.json(studentScore);
  }
}

function updateGrade(req: Request, res: Response): void {
  // TODO: Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { studentName, assignmentName } = req.params as GradeUpdateParams;

  // TODO: Get the grade from the request body as an `AssignmentGrade`
  const grades = req.body as AssignmentGrade;

  // TODO: Update the student's grade
  const flag = updateStudentGrade(studentName, assignmentName, grades.grade);

  // TODO: If the update did not complete (this means the student or the assignment wasn't found)
  if (!flag) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
}
export {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};

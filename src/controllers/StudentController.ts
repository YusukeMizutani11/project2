import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
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

  if (!student) {
    res.sendStatus(404);
  }

  // TODO: Get the current average and weights from the student's data
  const { currentAverage } = req.body;
  const { weight } = req.body as CourseGrade;

  const scoreForA = calculateFinalExamScore(currentAverage, weight, 90);
  const scoreForB = calculateFinalExamScore(currentAverage, weight, 80);
  const scoreForC = calculateFinalExamScore(currentAverage, weight, 70);
  const scoreForD = calculateFinalExamScore(currentAverage, weight, 60);

  const scores: FinalExamScores = {
    neededForA: scoreForA,
    neededForB: scoreForB,
    neededForC: scoreForC,
    neededForD: scoreForD,
  };

  // TODO: Send a JSON response with an object containing the grades needed for an A through D
  res.json(scores);
}

function calcFinalScore(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
  }

  // TODO: Get the grade data from the request body as the `AssignmentGrade` type
  const { grade } = req.body as AssignmentGrade;
  // TODO: Get the current average and weights from the student's data
  const { currentAverage } = req.body;
  const { weight } = req.body as CourseGrade;

  const overallScore = currentAverage + weight * grade;
  // TODO: Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const letterGrade = getLetterGrade(overallScore);

  const grades: FinalGrade = {
    overallScore,
    letterGrade,
  };

  // TODO: Send back a JSON response containing their `overallScore` and `letterGrade.
  res.json(grades);
}

export { getAllStudents, createNewStudent, getStudentByName, getFinalExamScores, calcFinalScore };

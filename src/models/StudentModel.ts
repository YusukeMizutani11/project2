const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let averageGrade = 0;
  for (const grade of weights.assignmentWeights)
    averageGrade += (grade.grade * grade.weight) / (100 - weights.finalExamWeight);
  return averageGrade;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // if the name is already in `students`
  // then return false
  if (name in students) {
    return false;
  }

  // Calculate the student's current average (use the function previously defined)
  const currAve: number = calculateAverage(weights);

  // Create a `Student` object using the `name`, `weights` and `currentAverage`
  const newStudent: Student = {
    name,
    weights,
    currentAverage: currAve,
  };

  // Add the new Student to the `students` object. The student's name is the key
  students[name] = newStudent;
  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  if (!(studentName in students)) {
    return undefined;
  }
  return students[studentName];
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // TODO: Calculate the final exam score needed to get the targetScore in the class
  const score = currentAverage * ((100 - finalExamWeight) / 100);
  const gap = targetScore - score;
  const x = (gap / finalExamWeight) * 100;
  return x;
}

function getLetterGrade(score: number): string {
  // TODO: Return the appropriate letter grade
  if (score >= 90) return 'A';
  if (score >= 80 && score < 90) return 'B';
  if (score >= 70 && score < 80) return 'C';
  if (score >= 60 && score < 70) return 'D';
  return 'F';
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  const student = getStudent(studentName);

  if (!student) {
    return false;
  }

  const assignment = student.weights.assignmentWeights.find(
    (element) => element.name === assignmentName
  );

  if (!assignment) {
    return false;
  }
  assignment.grade = newGrade;

  student.currentAverage = calculateAverage(student.weights);

  return true;
}

export {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};

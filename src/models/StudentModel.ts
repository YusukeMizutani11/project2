const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let averageGrade = 0;
  for (let i = 0; i < weights.assignmentWeights.length; i += 1)
    averageGrade += weights.assignmentWeights[i].weight * weights.assignmentWeights[i].grade;
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
  return students.studentName;
}

export { students, addStudent, getStudent };

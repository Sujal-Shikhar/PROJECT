/*
==================================================
GRADE CALCULATOR UTILITY
==================================================
*/

exports.calculateGrade = (
  percentage
) => {

  if (percentage >= 90) {
    return {
      grade: "O",
      gradePoint: 10,
      result: "Pass",
    };
  }

  if (percentage >= 80) {
    return {
      grade: "A+",
      gradePoint: 9,
      result: "Pass",
    };
  }

  if (percentage >= 70) {
    return {
      grade: "A",
      gradePoint: 8,
      result: "Pass",
    };
  }

  if (percentage >= 60) {
    return {
      grade: "B+",
      gradePoint: 7,
      result: "Pass",
    };
  }

  if (percentage >= 50) {
    return {
      grade: "B",
      gradePoint: 6,
      result: "Pass",
    };
  }

  if (percentage >= 40) {
    return {
      grade: "C",
      gradePoint: 5,
      result: "Pass",
    };
  }

  return {
    grade: "F",
    gradePoint: 0,
    result: "Fail",
  };

};
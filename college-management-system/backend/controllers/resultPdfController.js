const PDFDocument = require("pdfkit");

const Result = require("../models/Result");
const Student = require("../models/Student");

/*
==================================================
Generate Student Result PDF
==================================================
*/

exports.generateResultPDF = async (
  req,
  res
) => {
  try {

    const student =
      await Student.findById(
        req.params.studentId
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const results =
      await Result.find({
        student: student._id,
        isPublished: true,
        isActive: true,
      })
        .populate(
          "subject",
          "name code credits"
        )
        .populate(
          "exam",
          "name"
        );

    if (!results.length) {
      return res.status(404).json({
        success: false,
        message:
          "No published results found.",
      });
    }

    const pdf =
      new PDFDocument({
        size: "A4",
        margin: 50,
      });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${student.rollNumber}_Result.pdf`
    );

    pdf.pipe(res);

    /*
    ==========================================
    Title
    ==========================================
    */

    pdf
      .fontSize(20)
      .text(
        "COLLEGE MANAGEMENT SYSTEM",
        {
          align: "center",
        }
      );

    pdf.moveDown();

    pdf
      .fontSize(16)
      .text(
        "STUDENT RESULT",
        {
          align: "center",
        }
      );

    pdf.moveDown(2);

    /*
    ==========================================
    Student Details
    ==========================================
    */

    pdf.fontSize(12);

    pdf.text(
      `Name : ${student.name}`
    );

    pdf.text(
      `Roll Number : ${student.rollNumber}`
    );

    pdf.text(
      `Department : ${student.department}`
    );

    pdf.text(
      `Semester : ${student.semester}`
    );

    pdf.moveDown(2);

    /*
    ==========================================
    Table Header
    ==========================================
    */

    pdf.fontSize(12);

    pdf.text(
      "-------------------------------------------------------------"
    );

    pdf.text(
      "Subject Code      Subject Name      Total      Grade"
    );

    pdf.text(
      "-------------------------------------------------------------"
    );
        /*
    ==========================================
    Subject Rows
    ==========================================
    */

    let grandTotal = 0;
    let totalCredits = 0;
    let totalGradePoints = 0;
    let hasFailed = false;

    results.forEach((result) => {

      const subject = result.subject;

      grandTotal += result.totalMarks;

      totalCredits +=
        subject.credits;

      totalGradePoints +=
        subject.credits *
        result.gradePoint;

      if (
        result.result === "Fail"
      ) {
        hasFailed = true;
      }

      pdf.text(
        `${subject.code.padEnd(18)} ${subject.name.padEnd(18)} ${String(result.totalMarks).padEnd(10)} ${result.grade}`
      );

    });

    pdf.text(
      "-------------------------------------------------------------"
    );

    pdf.moveDown();

    /*
    ==========================================
    Summary
    ==========================================
    */

    const maxMarks =
      results.length * 200;

    const percentage =
      (
        (grandTotal /
          maxMarks) *
        100
      ).toFixed(2);

    const sgpa =
      totalCredits
        ? (
            totalGradePoints /
            totalCredits
          ).toFixed(2)
        : "0.00";

    pdf.fontSize(13);

    pdf.text(
      `Total Subjects : ${results.length}`
    );

    pdf.text(
      `Grand Total : ${grandTotal} / ${maxMarks}`
    );

    pdf.text(
      `Percentage : ${percentage}%`
    );

    pdf.text(
      `SGPA : ${sgpa}`
    );

    pdf.text(
      `Result : ${
        hasFailed
          ? "FAIL"
          : "PASS"
      }`
    );

    pdf.moveDown(2);

    /*
    ==========================================
    Footer
    ==========================================
    */

    pdf
      .fontSize(10)
      .text(
        `Generated On : ${new Date().toLocaleString()}`,
        {
          align: "center",
        }
      );

    pdf.end();

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        "Unable to generate result PDF.",

    });

  }

};

/*
==================================================
Generate PDF By Result ID
==================================================
*/

exports.generateResultByIdPDF =
  async (
    req,
    res
  ) => {

    try {

      const result =
        await Result.findById(
          req.params.id
        );

      if (!result) {

        return res.status(404).json({

          success: false,

          message:
            "Result not found.",

        });

      }

      req.params.studentId =
        result.student;

      return exports.generateResultPDF(
        req,
        res
      );

    } catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          "Unable to generate PDF.",

      });

    }

  };
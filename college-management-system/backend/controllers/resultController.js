const Result = require("../models/Result");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const Exam = require("../models/Exam");
const InternalMark = require("../models/InternalMark");

/*
==================================================
Create Result
==================================================
*/

exports.createResult = async (
  req,
  res
) => {

  try {

    const {
      student,
      subject,
      exam,
      externalMarks,
      remarks,
    } = req.body;

    /*
    ==========================================
    Validate Student
    ==========================================
    */

    const studentExists =
      await Student.findById(student);

    if (!studentExists) {

      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });

    }

    /*
    ==========================================
    Validate Subject
    ==========================================
    */

    const subjectExists =
      await Subject.findById(subject);

    if (!subjectExists) {

      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });

    }

    /*
    ==========================================
    Validate Exam
    ==========================================
    */

    const examExists =
      await Exam.findById(exam);

    if (!examExists) {

      return res.status(404).json({
        success: false,
        message: "Exam not found.",
      });

    }

    /*
    ==========================================
    Duplicate Check
    ==========================================
    */

    const existingResult =
      await Result.findOne({
        student,
        subject,
        exam,
      });

    if (existingResult) {

      return res.status(400).json({
        success: false,
        message:
          "Result already exists.",
      });

    }

    /*
    ==========================================
    Fetch Internal Marks
    ==========================================
    */

    const internal =
      await InternalMark.findOne({
        student,
        subject,
        exam,
        isActive: true,
      });

    if (!internal) {

      return res.status(404).json({
        success: false,
        message:
          "Internal marks not found.",
      });

    }

    /*
    ==========================================
    Create Result
    ==========================================
    */

    const result =
      await Result.create({

        student,

        subject,

        exam,

        internalMarks:
          internal.totalInternalMarks,

        externalMarks,

        remarks,

      });

    res.status(201).json({

      success: true,

      message:
        "Result created successfully.",

      result,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to create result.",

    });

  }

};

/*
==================================================
Get All Results
==================================================
*/

exports.getResults =
  async (
    req,
    res
  ) => {

    try {

      const {
        page = 1,
        limit = 10,
        student,
        subject,
        exam,
        published,
      } = req.query;

      const query = {
        isActive: true,
      };

      if (student)
        query.student =
          student;

      if (subject)
        query.subject =
          subject;

      if (exam)
        query.exam =
          exam;

      if (
        published !== undefined
      ) {

        query.isPublished =
          published === "true";

      }

      const total =
        await Result.countDocuments(
          query
        );

      const results =
        await Result.find(query)
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .populate(
            "subject",
            "name code credits"
          )
          .populate(
            "exam",
            "name examType"
          )
          .sort({
            createdAt: -1,
          })
          .skip(
            (page - 1) *
            Number(limit)
          )
          .limit(
            Number(limit)
          );

      res.status(200).json({

        success: true,

        total,

        currentPage:
          Number(page),

        totalPages:
          Math.ceil(
            total /
            Number(limit)
          ),

        results,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch results.",

      });

    }

  };

/*
==================================================
Get Result By ID
==================================================
*/

exports.getResultById =
  async (
    req,
    res
  ) => {

    try {

      const result =
        await Result.findById(
          req.params.id
        )
          .populate("student")
          .populate("subject")
          .populate("exam");

      if (!result) {

        return res.status(404).json({

          success: false,

          message:
            "Result not found.",

        });

      }

      res.status(200).json({

        success: true,

        result,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Search Results
==================================================
*/

exports.searchResults =
  async (
    req,
    res
  ) => {

    try {

      const keyword =
        req.query.search || "";

      const results =
        await Result.find({
          isActive: true,
        })
          .populate({
            path: "student",
            match: {
              $or: [
                {
                  name: {
                    $regex: keyword,
                    $options: "i",
                  },
                },
                {
                  rollNumber: {
                    $regex: keyword,
                    $options: "i",
                  },
                },
              ],
            },
          })
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "exam",
            "name"
          );

      const filtered =
        results.filter(
          (
            item
          ) => item.student
        );

      res.status(200).json({

        success: true,

        total:
          filtered.length,

        results:
          filtered,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Update Result
==================================================
*/

exports.updateResult =
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

      /*
      ==========================================
      Locked Check
      ==========================================
      */

      if (result.isLocked) {

        return res.status(400).json({

          success: false,

          message:
            "Result is locked and cannot be updated.",

        });

      }

      if (
        req.body.externalMarks !==
        undefined
      ) {

        result.externalMarks =
          req.body.externalMarks;

      }

      if (
        req.body.remarks !==
        undefined
      ) {

        result.remarks =
          req.body.remarks;

      }

      /*
      ==========================================
      Refresh Internal Marks
      ==========================================
      */

      const internal =
        await InternalMark.findOne({

          student:
            result.student,

          subject:
            result.subject,

          exam:
            result.exam,

          isActive: true,

        });

      if (internal) {

        result.internalMarks =
          internal.totalInternalMarks;

      }

      await result.save();

      res.status(200).json({

        success: true,

        message:
          "Result updated successfully.",

        result,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to update result.",

      });

    }

  };

/*
==================================================
Delete Result
==================================================
*/

exports.deleteResult =
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

      result.isActive =
        false;

      await result.save();

      res.status(200).json({

        success: true,

        message:
          "Result deleted successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Restore Result
==================================================
*/

exports.restoreResult =
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

      result.isActive =
        true;

      await result.save();

      res.status(200).json({

        success: true,

        message:
          "Result restored successfully.",

        result,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Publish Result
==================================================
*/

exports.publishResult =
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

      result.isPublished =
        true;

      await result.save();

      res.status(200).json({

        success: true,

        message:
          "Result published successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Unpublish Result
==================================================
*/

exports.unpublishResult =
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

      result.isPublished =
        false;

      await result.save();

      res.status(200).json({

        success: true,

        message:
          "Result unpublished successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Lock Result
==================================================
*/

exports.lockResult =
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

      result.isLocked =
        true;

      await result.save();

      res.status(200).json({

        success: true,

        message:
          "Result locked successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Unlock Result
==================================================
*/

exports.unlockResult =
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

      result.isLocked =
        false;

      await result.save();

      res.status(200).json({

        success: true,

        message:
          "Result unlocked successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Get Student Results
==================================================
*/

exports.getStudentResults =
  async (
    req,
    res
  ) => {

    try {

      const results =
        await Result.find({

          student:
            req.params.studentId,

          isActive: true,

        })
          .populate(
            "subject",
            "name code credits"
          )
          .populate(
            "exam",
            "name examType"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          results.length,

        results,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Get Subject Results
==================================================
*/

exports.getSubjectResults =
  async (
    req,
    res
  ) => {

    try {

      const results =
        await Result.find({

          subject:
            req.params.subjectId,

          isActive: true,

        })
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .populate(
            "exam",
            "name examType"
          )
          .sort({
            totalMarks: -1,
          });

      res.status(200).json({

        success: true,

        total:
          results.length,

        results,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch subject results.",

      });

    }

  };

/*
==================================================
Get Exam Results
==================================================
*/

exports.getExamResults =
  async (
    req,
    res
  ) => {

    try {

      const results =
        await Result.find({

          exam:
            req.params.examId,

          isActive: true,

        })
          .populate(
            "student",
            "name rollNumber"
          )
          .populate(
            "subject",
            "name code credits"
          )
          .sort({
            totalMarks: -1,
          });

      res.status(200).json({

        success: true,

        total:
          results.length,

        results,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Semester SGPA
==================================================
*/

exports.calculateSGPA =
  async (
    req,
    res
  ) => {

    try {

      const {
        studentId,
        examId,
      } = req.params;

      const results =
        await Result.find({

          student: studentId,

          exam: examId,

          isActive: true,

        }).populate(
          "subject",
          "credits"
        );

      if (!results.length) {

        return res.status(404).json({

          success: false,

          message:
            "No results found.",

        });

      }

      let totalCredits = 0;

      let weightedPoints = 0;

      results.forEach(
        (
          result
        ) => {

          const credits =
            result.subject?.credits || 0;

          totalCredits += credits;

          weightedPoints +=
            credits *
            result.gradePoint;

        }
      );

      const sgpa =
        totalCredits
          ? (
              weightedPoints /
              totalCredits
            ).toFixed(2)
          : 0;

      res.status(200).json({

        success: true,

        sgpa,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
CGPA
==================================================
*/

exports.calculateCGPA =
  async (
    req,
    res
  ) => {

    try {

      const results =
        await Result.find({

          student:
            req.params.studentId,

          isActive: true,

        }).populate(
          "subject",
          "credits"
        );

      let credits = 0;

      let points = 0;

      results.forEach(
        (
          result
        ) => {

          const c =
            result.subject?.credits || 0;

          credits += c;

          points +=
            c *
            result.gradePoint;

        }
      );

      const cgpa =
        credits
          ? (
              points /
              credits
            ).toFixed(2)
          : 0;

      res.status(200).json({

        success: true,

        cgpa,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Statistics
==================================================
*/

exports.getResultStats =
  async (
    req,
    res
  ) => {

    try {

      const total =
        await Result.countDocuments();

      const pass =
        await Result.countDocuments({

          result: "Pass",

        });

      const fail =
        await Result.countDocuments({

          result: "Fail",

        });

      const published =
        await Result.countDocuments({

          isPublished: true,

        });

      const average =
        await Result.aggregate([

          {

            $group: {

              _id: null,

              averageMarks: {

                $avg:
                  "$totalMarks",

              },

              highest: {

                $max:
                  "$totalMarks",

              },

              lowest: {

                $min:
                  "$totalMarks",

              },

            },

          },

        ]);

      res.status(200).json({

        success: true,

        total,

        pass,

        fail,

        published,

        average:
          average[0]
            ?.averageMarks || 0,

        highest:
          average[0]
            ?.highest || 0,

        lowest:
          average[0]
            ?.lowest || 0,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Dashboard Summary
==================================================
*/

exports.dashboardSummary =
  async (
    req,
    res
  ) => {

    try {

      const latest =
        await Result.find({
          isActive: true,
        })
          .populate(
            "student",
            "name rollNumber"
          )
          .populate(
            "subject",
            "name code"
          )
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.status(200).json({

        success: true,

        latest,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Export Results
==================================================
*/

exports.exportResults =
  async (
    req,
    res
  ) => {

    try {

      const results =
        await Result.find()
          .populate("student")
          .populate("subject")
          .populate("exam")
          .lean();

      res.status(200).json({

        success: true,

        total:
          results.length,

        results,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

      });

    }

  };

/*
==================================================
Import Results
==================================================
*/

exports.importResults =
  async (
    req,
    res
  ) => {

    try {

      if (
        !Array.isArray(
          req.body
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Expected an array of results.",

        });

      }

      const inserted =
        await Result.insertMany(
          req.body,
          {
            ordered: false,
          }
        );

      res.status(201).json({

        success: true,

        inserted:
          inserted.length,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Import failed.",

      });

    }

  };
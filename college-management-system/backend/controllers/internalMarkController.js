const InternalMark = require("../models/InternalMark");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const Faculty = require("../models/Faculty");
const Exam = require("../models/Exam");

/*
==================================================
Create Internal Mark
==================================================
*/

exports.createInternalMark = async (
  req,
  res
) => {
  try {

    const {
      student,
      subject,
      faculty,
      exam,
      assignmentMarks,
      quizMarks,
      attendanceMarks,
      practicalMarks,
      vivaMarks,
      internalExamMarks,
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
    Validate Faculty
    ==========================================
    */

    const facultyExists =
      await Faculty.findById(faculty);

    if (!facultyExists) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
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

    const existing =
      await InternalMark.findOne({
        student,
        subject,
        exam,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Internal marks already exist for this student.",
      });
    }

    /*
    ==========================================
    Create Record
    ==========================================
    */

    const internalMark =
      await InternalMark.create({

        student,
        subject,
        faculty,
        exam,

        assignmentMarks,
        quizMarks,
        attendanceMarks,
        practicalMarks,
        vivaMarks,
        internalExamMarks,

        remarks,

      });

    res.status(201).json({
      success: true,
      message:
        "Internal marks created successfully.",
      internalMark,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to create internal marks.",
    });

  }

};

/*
==================================================
Get All Internal Marks
==================================================
*/

exports.getInternalMarks =
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
        faculty,
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

      if (faculty)
        query.faculty =
          faculty;

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
        await InternalMark.countDocuments(
          query
        );

      const internalMarks =
        await InternalMark.find(
          query
        )
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "faculty",
            "name employeeId"
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

        internalMarks,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch internal marks.",
      });

    }

  };

/*
==================================================
Get Internal Mark By ID
==================================================
*/

exports.getInternalMarkById =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        )
          .populate(
            "student"
          )
          .populate(
            "subject"
          )
          .populate(
            "faculty"
          )
          .populate(
            "exam"
          );

      if (!internalMark) {

        return res.status(404).json({
          success: false,
          message:
            "Internal mark not found.",
        });

      }

      res.status(200).json({
        success: true,
        internalMark,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch internal mark.",
      });

    }

  };

/*
==================================================
Search Internal Marks
==================================================
*/

exports.searchInternalMarks =
  async (
    req,
    res
  ) => {

    try {

      const keyword =
        req.query.search || "";

      const records =
        await InternalMark.find({
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
            "faculty",
            "name"
          )
          .populate(
            "exam",
            "name"
          );

      const filtered =
        records.filter(
          (
            item
          ) => item.student
        );

      res.status(200).json({
        success: true,
        total:
          filtered.length,
        internalMarks:
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
Update Internal Mark
==================================================
*/

exports.updateInternalMark =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        );

      if (!internalMark) {

        return res.status(404).json({
          success: false,
          message:
            "Internal mark not found.",
        });

      }

      /*
      ==========================================
      Locked Check
      ==========================================
      */

      if (internalMark.isLocked) {

        return res.status(400).json({
          success: false,
          message:
            "Marks are locked and cannot be edited.",
        });

      }

      const fields = [
        "assignmentMarks",
        "quizMarks",
        "attendanceMarks",
        "practicalMarks",
        "vivaMarks",
        "internalExamMarks",
        "remarks",
      ];

      fields.forEach((field) => {

        if (
          req.body[field] !== undefined
        ) {
          internalMark[field] =
            req.body[field];
        }

      });

      await internalMark.save();

      res.status(200).json({

        success: true,

        message:
          "Internal marks updated successfully.",

        internalMark,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to update internal marks.",

      });

    }

  };

/*
==================================================
Delete Internal Mark (Soft Delete)
==================================================
*/

exports.deleteInternalMark =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        );

      if (!internalMark) {

        return res.status(404).json({

          success: false,

          message:
            "Internal mark not found.",

        });

      }

      internalMark.isActive =
        false;

      await internalMark.save();

      res.status(200).json({

        success: true,

        message:
          "Internal mark deleted successfully.",

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
Restore Internal Mark
==================================================
*/

exports.restoreInternalMark =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        );

      if (!internalMark) {

        return res.status(404).json({

          success: false,

          message:
            "Internal mark not found.",

        });

      }

      internalMark.isActive =
        true;

      await internalMark.save();

      res.status(200).json({

        success: true,

        message:
          "Internal mark restored successfully.",

        internalMark,

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
Publish Marks
==================================================
*/

exports.publishMarks =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        );

      if (!internalMark) {

        return res.status(404).json({

          success: false,

          message:
            "Internal mark not found.",

        });

      }

      internalMark.isPublished =
        true;

      await internalMark.save();

      res.status(200).json({

        success: true,

        message:
          "Marks published successfully.",

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
Unpublish Marks
==================================================
*/

exports.unpublishMarks =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        );

      if (!internalMark) {

        return res.status(404).json({

          success: false,

          message:
            "Internal mark not found.",

        });

      }

      internalMark.isPublished =
        false;

      await internalMark.save();

      res.status(200).json({

        success: true,

        message:
          "Marks unpublished successfully.",

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
Lock Marks
==================================================
*/

exports.lockMarks =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        );

      if (!internalMark) {

        return res.status(404).json({

          success: false,

          message:
            "Internal mark not found.",

        });

      }

      internalMark.isLocked =
        true;

      await internalMark.save();

      res.status(200).json({

        success: true,

        message:
          "Marks locked successfully.",

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
Unlock Marks
==================================================
*/

exports.unlockMarks =
  async (
    req,
    res
  ) => {

    try {

      const internalMark =
        await InternalMark.findById(
          req.params.id
        );

      if (!internalMark) {

        return res.status(404).json({

          success: false,

          message:
            "Internal mark not found.",

        });

      }

      internalMark.isLocked =
        false;

      await internalMark.save();

      res.status(200).json({

        success: true,

        message:
          "Marks unlocked successfully.",

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
Get Student Internal Marks
==================================================
*/

exports.getStudentInternalMarks =
  async (
    req,
    res
  ) => {

    try {

      const internalMarks =
        await InternalMark.find({

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
          );

      res.status(200).json({

        success: true,

        total:
          internalMarks.length,

        internalMarks,

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
Get Subject Internal Marks
==================================================
*/

exports.getSubjectInternalMarks =
  async (
    req,
    res
  ) => {

    try {

      const internalMarks =
        await InternalMark.find({

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
            totalInternalMarks: -1,
          });

      res.status(200).json({

        success: true,

        total:
          internalMarks.length,

        internalMarks,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch subject internal marks.",

      });

    }

  };

/*
==================================================
Get Exam Internal Marks
==================================================
*/

exports.getExamInternalMarks =
  async (
    req,
    res
  ) => {

    try {

      const internalMarks =
        await InternalMark.find({

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
            "name code"
          )
          .populate(
            "faculty",
            "name employeeId"
          )
          .sort({
            totalInternalMarks: -1,
          });

      res.status(200).json({

        success: true,

        total:
          internalMarks.length,

        internalMarks,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch exam marks.",

      });

    }

  };

/*
==================================================
Statistics
==================================================
*/

exports.getInternalMarkStats =
  async (
    req,
    res
  ) => {

    try {

      const [
        totalRecords,
        published,
        unpublished,
        locked,
        unlocked,
      ] = await Promise.all([

        InternalMark.countDocuments(),

        InternalMark.countDocuments({
          isPublished: true,
        }),

        InternalMark.countDocuments({
          isPublished: false,
        }),

        InternalMark.countDocuments({
          isLocked: true,
        }),

        InternalMark.countDocuments({
          isLocked: false,
        }),

      ]);

      const averageMarks =
        await InternalMark.aggregate([
          {
            $group: {
              _id: null,
              average: {
                $avg:
                  "$totalInternalMarks",
              },
              highest: {
                $max:
                  "$totalInternalMarks",
              },
              lowest: {
                $min:
                  "$totalInternalMarks",
              },
            },
          },
        ]);

      res.status(200).json({

        success: true,

        stats: {

          totalRecords,

          published,

          unpublished,

          locked,

          unlocked,

          average:
            averageMarks[0]
              ?.average || 0,

          highest:
            averageMarks[0]
              ?.highest || 0,

          lowest:
            averageMarks[0]
              ?.lowest || 0,

        },

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

      const latestMarks =
        await InternalMark.find({
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

        latestMarks,

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
Export Internal Marks
==================================================
*/

exports.exportInternalMarks =
  async (
    req,
    res
  ) => {

    try {

      const records =
        await InternalMark.find()
          .populate(
            "student"
          )
          .populate(
            "subject"
          )
          .populate(
            "faculty"
          )
          .populate(
            "exam"
          )
          .lean();

      res.status(200).json({

        success: true,

        total:
          records.length,

        records,

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
Import Internal Marks
==================================================
*/

exports.importInternalMarks =
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
            "Expected an array of internal marks.",

        });

      }

      const inserted =
        await InternalMark.insertMany(
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
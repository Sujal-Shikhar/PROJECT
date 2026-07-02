const mongoose = require("mongoose");

const Exam = require("../models/Exam");
const Subject = require("../models/Subject");
const Faculty = require("../models/Faculty");

/*
==================================================
Create Exam
==================================================
*/

exports.createExam = async (
  req,
  res
) => {
  try {
    const {
      examName,
      examType,
      subject,
      faculty,
      department,
      semester,
      examDate,
      startTime,
      endTime,
      roomNumber,
      totalMarks,
      passingMarks,
      instructions,
    } = req.body;

    /*
    ==========================================
    Validate Subject & Faculty
    ==========================================
    */

    const [
      subjectExists,
      facultyExists,
    ] = await Promise.all([
      Subject.findById(subject),
      Faculty.findById(faculty),
    ]);

    if (!subjectExists) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    if (!facultyExists) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    /*
    ==========================================
    Duplicate Exam Check
    ==========================================
    */

    const existingExam =
      await Exam.findOne({
        subject,
        semester,
        examType,
        examDate: new Date(examDate),
      });

    if (existingExam) {
      return res.status(400).json({
        success: false,
        message:
          "Exam already scheduled for this subject.",
      });
    }

    /*
    ==========================================
    Create Exam
    ==========================================
    */

    const exam =
      await Exam.create({
        examName,
        examType,
        subject,
        faculty,
        department,
        semester,
        examDate,
        startTime,
        endTime,
        roomNumber,
        totalMarks,
        passingMarks,
        instructions,
        createdBy: req.user.id,
      });

    res.status(201).json({
      success: true,
      message:
        "Exam created successfully.",
      exam,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to create exam.",
    });
  }
};

/*
==================================================
Get All Exams
==================================================
*/

exports.getExams = async (
  req,
  res
) => {
  try {
    const {
      page = 1,
      limit = 10,
      department,
      semester,
      examType,
      status,
      search,
    } = req.query;

    const query = {};

    if (department)
      query.department = department;

    if (semester)
      query.semester = Number(semester);

    if (examType)
      query.examType = examType;

    if (status)
      query.status = status;

    if (search) {
      query.examName = {
        $regex: search,
        $options: "i",
      };
    }

    const total =
      await Exam.countDocuments(query);

    const exams =
      await Exam.find(query)
        .populate(
          "subject",
          "name code"
        )
        .populate(
          "faculty",
          "name employeeId"
        )
        .sort({
          examDate: 1,
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
          total / limit
        ),
      exams,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch exams.",
    });
  }
};

/*
==================================================
Get Exam By ID
==================================================
*/

exports.getExamById =
  async (
    req,
    res
  ) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid exam ID.",
        });
      }

      const exam =
        await Exam.findById(
          req.params.id
        )
          .populate("subject")
          .populate("faculty");

      if (!exam) {
        return res.status(404).json({
          success: false,
          message:
            "Exam not found.",
        });
      }

      res.status(200).json({
        success: true,
        exam,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch exam.",
      });
    }
  };

/*
==================================================
Update Exam
==================================================
*/

exports.updateExam = async (
  req,
  res
) => {
  try {
    const exam =
      await Exam.findById(
        req.params.id
      );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found.",
      });
    }

    const {
      subject,
      faculty,
      examType,
      semester,
      examDate,
    } = req.body;

    /*
    ==========================================
    Validate Subject
    ==========================================
    */

    if (subject) {
      const subjectExists =
        await Subject.findById(subject);

      if (!subjectExists) {
        return res.status(404).json({
          success: false,
          message: "Subject not found.",
        });
      }

      exam.subject = subject;
    }

    /*
    ==========================================
    Validate Faculty
    ==========================================
    */

    if (faculty) {
      const facultyExists =
        await Faculty.findById(faculty);

      if (!facultyExists) {
        return res.status(404).json({
          success: false,
          message: "Faculty not found.",
        });
      }

      exam.faculty = faculty;
    }

    /*
    ==========================================
    Duplicate Exam Check
    ==========================================
    */

    const duplicate =
      await Exam.findOne({
        _id: {
          $ne: exam._id,
        },
        subject:
          subject || exam.subject,
        semester:
          semester || exam.semester,
        examType:
          examType || exam.examType,
        examDate:
          examDate || exam.examDate,
      });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message:
          "Another exam already exists for this subject.",
      });
    }

    Object.assign(exam, req.body);

    exam.updatedBy =
      req.user.id;

    await exam.save();

    res.status(200).json({
      success: true,
      message:
        "Exam updated successfully.",
      exam,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to update exam.",
    });
  }
};

/*
==================================================
Delete Exam (Soft Delete)
==================================================
*/

exports.deleteExam = async (
  req,
  res
) => {
  try {
    const exam =
      await Exam.findById(
        req.params.id
      );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message:
          "Exam not found.",
      });
    }

    exam.isActive = false;
    exam.updatedBy = req.user.id;

    await exam.save();

    res.status(200).json({
      success: true,
      message:
        "Exam deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to delete exam.",
    });
  }
};

/*
==================================================
Restore Exam
==================================================
*/

exports.restoreExam =
  async (
    req,
    res
  ) => {
    try {
      const exam =
        await Exam.findById(
          req.params.id
        );

      if (!exam) {
        return res.status(404).json({
          success: false,
          message:
            "Exam not found.",
        });
      }

      exam.isActive = true;
      exam.updatedBy = req.user.id;

      await exam.save();

      res.status(200).json({
        success: true,
        message:
          "Exam restored successfully.",
        exam,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to restore exam.",
      });
    }
  };

/*
==================================================
Upcoming Exams
==================================================
*/

exports.getUpcomingExams =
  async (
    req,
    res
  ) => {
    try {
      const exams =
        await Exam.find({
          examDate: {
            $gte: new Date(),
          },
          status: "Scheduled",
          isActive: true,
        })
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "faculty",
            "name"
          )
          .sort({
            examDate: 1,
          });

      res.status(200).json({
        success: true,
        total:
          exams.length,
        exams,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch upcoming exams.",
      });
    }
  };

/*
==================================================
Completed Exams
==================================================
*/

exports.getCompletedExams =
  async (
    req,
    res
  ) => {
    try {
      const exams =
        await Exam.find({
          status: "Completed",
          isActive: true,
        })
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "faculty",
            "name"
          )
          .sort({
            examDate: -1,
          });

      res.status(200).json({
        success: true,
        total:
          exams.length,
        exams,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch completed exams.",
      });
    }
  };

/*
==================================================
Cancel Exam
==================================================
*/

exports.cancelExam =
  async (
    req,
    res
  ) => {
    try {
      const exam =
        await Exam.findById(
          req.params.id
        );

      if (!exam) {
        return res.status(404).json({
          success: false,
          message:
            "Exam not found.",
        });
      }

      exam.status =
        "Cancelled";

      exam.updatedBy =
        req.user.id;

      await exam.save();

      res.status(200).json({
        success: true,
        message:
          "Exam cancelled successfully.",
        exam,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to cancel exam.",
      });
    }
  };

/*
==================================================
Reschedule Exam
==================================================
*/

exports.rescheduleExam =
  async (
    req,
    res
  ) => {
    try {
      const exam =
        await Exam.findById(
          req.params.id
        );

      if (!exam) {
        return res.status(404).json({
          success: false,
          message:
            "Exam not found.",
        });
      }

      exam.examDate =
        req.body.examDate;

      exam.startTime =
        req.body.startTime;

      exam.endTime =
        req.body.endTime;

      exam.roomNumber =
        req.body.roomNumber;

      exam.status =
        "Scheduled";

      exam.updatedBy =
        req.user.id;

      await exam.save();

      res.status(200).json({
        success: true,
        message:
          "Exam rescheduled successfully.",
        exam,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to reschedule exam.",
      });
    }
  };

/*
==================================================
Exam Statistics
==================================================
*/

exports.getExamStats = async (
  req,
  res
) => {
  try {
    const [
      totalExams,
      scheduledExams,
      completedExams,
      cancelledExams,
      departmentStats,
      typeStats,
    ] = await Promise.all([
      Exam.countDocuments({
        isActive: true,
      }),

      Exam.countDocuments({
        status: "Scheduled",
        isActive: true,
      }),

      Exam.countDocuments({
        status: "Completed",
        isActive: true,
      }),

      Exam.countDocuments({
        status: "Cancelled",
        isActive: true,
      }),

      Exam.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $group: {
            _id: "$department",
            total: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]),

      Exam.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $group: {
            _id: "$examType",
            total: {
              $sum: 1,
            },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalExams,
        scheduledExams,
        completedExams,
        cancelledExams,
        departmentStats,
        typeStats,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch statistics.",
    });
  }
};

/*
==================================================
Department Wise Exams
==================================================
*/

exports.getDepartmentExams =
  async (
    req,
    res
  ) => {
    try {
      const exams =
        await Exam.find({
          department:
            req.params.department,
          isActive: true,
        })
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "faculty",
            "name"
          )
          .sort({
            examDate: 1,
          });

      res.status(200).json({
        success: true,
        total:
          exams.length,
        exams,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch department exams.",
      });
    }
  };

/*
==================================================
Semester Wise Exams
==================================================
*/

exports.getSemesterExams =
  async (
    req,
    res
  ) => {
    try {
      const exams =
        await Exam.find({
          semester:
            Number(
              req.params.semester
            ),
          isActive: true,
        })
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "faculty",
            "name"
          )
          .sort({
            examDate: 1,
          });

      res.status(200).json({
        success: true,
        total:
          exams.length,
        exams,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch semester exams.",
      });
    }
  };

/*
==================================================
Exam Calendar
==================================================
*/

exports.examCalendar =
  async (
    req,
    res
  ) => {
    try {
      const exams =
        await Exam.find({
          isActive: true,
        })
          .select(
            "examName examDate startTime endTime roomNumber department semester"
          )
          .sort({
            examDate: 1,
          });

      res.status(200).json({
        success: true,
        exams,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch exam calendar.",
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
      const latestExams =
        await Exam.find({
          isActive: true,
        })
          .populate(
            "subject",
            "name"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const upcoming =
        await Exam.countDocuments({
          examDate: {
            $gte:
              new Date(),
          },
          status:
            "Scheduled",
          isActive: true,
        });

      res.status(200).json({
        success: true,
        dashboard: {
          upcoming,
          latestExams,
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
Export Exams
==================================================
*/

exports.exportExams =
  async (
    req,
    res
  ) => {
    try {
      const exams =
        await Exam.find({
          isActive: true,
        })
          .populate(
            "subject"
          )
          .populate(
            "faculty"
          )
          .lean();

      res.status(200).json({
        success: true,
        total:
          exams.length,
        exams,
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
Import Exams
==================================================
*/

exports.importExams =
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
            "Array expected.",
        });
      }

      const inserted =
        await Exam.insertMany(
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
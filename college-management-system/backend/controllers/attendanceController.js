const mongoose = require("mongoose");

const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Subject = require("../models/Subject");

/*
==================================================
Mark Attendance
==================================================
*/

exports.markAttendance = async (
  req,
  res
) => {
  try {
    const {
      student,
      faculty,
      subject,
      date,
      lectureNumber,
      status,
      remarks,
    } = req.body;

    /*
    ===========================
    Validate References
    ===========================
    */

    const [
      studentExists,
      facultyExists,
      subjectExists,
    ] = await Promise.all([
      Student.findById(student),

      Faculty.findById(faculty),

      Subject.findById(subject),
    ]);

    if (!studentExists) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    if (!facultyExists) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    if (!subjectExists) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    /*
    ===========================
    Duplicate Check
    ===========================
    */

    const exists =
      await Attendance.findOne({
        student,
        subject,
        lectureNumber,
        date: new Date(date),
      });

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "Attendance already marked.",
      });
    }

    /*
    ===========================
    Create Attendance
    ===========================
    */

    const attendance =
      await Attendance.create({
        student,

        faculty,

        subject,

        lectureNumber,

        date,

        status,

        remarks,

        createdBy:
          req.user.id,
      });

    res.status(201).json({
      success: true,

      message:
        "Attendance marked successfully.",

      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message:
        "Unable to mark attendance.",
    });
  }
};

/*
==================================================
Get All Attendance
==================================================
*/

exports.getAttendance = async (
  req,
  res
) => {
  try {
    const {
      page = 1,
      limit = 20,
      student,
      faculty,
      subject,
      status,
      date,
    } = req.query;

    const query = {};

    if (student)
      query.student = student;

    if (faculty)
      query.faculty = faculty;

    if (subject)
      query.subject = subject;

    if (status)
      query.status = status;

    if (date) {
      const start =
        new Date(date);

      const end =
        new Date(date);

      end.setHours(
        23,
        59,
        59,
        999
      );

      query.date = {
        $gte: start,
        $lte: end,
      };
    }

    const total =
      await Attendance.countDocuments(
        query
      );

    const attendance =
      await Attendance.find(query)
        .populate(
          "student",
          "name rollNumber"
        )
        .populate(
          "faculty",
          "name employeeId"
        )
        .populate(
          "subject",
          "name code"
        )
        .sort({
          date: -1,
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

      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message:
        "Unable to fetch attendance.",
    });
  }
};

/*
==================================================
Get Attendance By ID
==================================================
*/

exports.getAttendanceById =
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
            "Invalid attendance ID.",
        });
      }

      const attendance =
        await Attendance.findById(
          req.params.id
        )
          .populate("student")
          .populate("faculty")
          .populate("subject");

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message:
            "Attendance not found.",
        });
      }

      res.status(200).json({
        success: true,
        attendance,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch attendance.",
      });
    }
  };

/*
==================================================
Update Attendance
==================================================
*/

exports.updateAttendance = async (
  req,
  res
) => {
  try {
    const attendance =
      await Attendance.findById(
        req.params.id
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message:
          "Attendance record not found.",
      });
    }

    const {
      faculty,
      subject,
      lectureNumber,
      date,
      status,
      remarks,
    } = req.body;

    /*
    ==========================================
    Validate Faculty
    ==========================================
    */

    if (faculty) {
      const facultyExists =
        await Faculty.findById(
          faculty
        );

      if (!facultyExists) {
        return res.status(404).json({
          success: false,
          message:
            "Faculty not found.",
        });
      }

      attendance.faculty =
        faculty;
    }

    /*
    ==========================================
    Validate Subject
    ==========================================
    */

    if (subject) {
      const subjectExists =
        await Subject.findById(
          subject
        );

      if (!subjectExists) {
        return res.status(404).json({
          success: false,
          message:
            "Subject not found.",
        });
      }

      attendance.subject =
        subject;
    }

    /*
    ==========================================
    Duplicate Check
    ==========================================
    */

    const duplicate =
      await Attendance.findOne({
        _id: {
          $ne: attendance._id,
        },

        student:
          attendance.student,

        subject:
          subject ||
          attendance.subject,

        lectureNumber:
          lectureNumber ||
          attendance.lectureNumber,

        date:
          date ||
          attendance.date,
      });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message:
          "Attendance already exists for this lecture.",
      });
    }

    if (lectureNumber)
      attendance.lectureNumber =
        lectureNumber;

    if (date)
      attendance.date =
        date;

    if (status)
      attendance.status =
        status;

    if (remarks !== undefined)
      attendance.remarks =
        remarks;

    attendance.updatedBy =
      req.user.id;

    await attendance.save();

    res.status(200).json({
      success: true,
      message:
        "Attendance updated successfully.",
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to update attendance.",
    });
  }
};

/*
==================================================
Delete Attendance
==================================================
*/

exports.deleteAttendance =
  async (
    req,
    res
  ) => {
    try {
      const attendance =
        await Attendance.findById(
          req.params.id
        );

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message:
            "Attendance record not found.",
        });
      }

      await attendance.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Attendance deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to delete attendance.",
      });
    }
  };

/*
==================================================
Bulk Mark Attendance
==================================================
*/

exports.bulkAttendance =
  async (
    req,
    res
  ) => {
    try {
      const { attendance } =
        req.body;

      if (
        !Array.isArray(
          attendance
        ) ||
        attendance.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Attendance array is required.",
        });
      }

      const documents =
        attendance.map(
          (record) => ({
            ...record,
            createdBy:
              req.user.id,
          })
        );

      const inserted =
        await Attendance.insertMany(
          documents,
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
          "Bulk attendance failed.",
      });
    }
  };

/*
==================================================
Bulk Delete Attendance
==================================================
*/

exports.bulkDeleteAttendance =
  async (
    req,
    res
  ) => {
    try {
      const { ids } =
        req.body;

      if (
        !Array.isArray(ids)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "IDs array required.",
        });
      }

      const result =
        await Attendance.deleteMany({
          _id: {
            $in: ids,
          },
        });

      res.status(200).json({
        success: true,
        deleted:
          result.deletedCount,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Bulk delete failed.",
      });
    }
  };

/*
==================================================
Student Attendance
==================================================
*/

exports.getStudentAttendance =
  async (
    req,
    res
  ) => {
    try {
      const attendance =
        await Attendance.find({
          student:
            req.params.studentId,
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
            date: -1,
          });

      res.status(200).json({
        success: true,
        total:
          attendance.length,
        attendance,
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
Subject Attendance
==================================================
*/

exports.getSubjectAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find({
          subject: req.params.subjectId,
        })
          .populate(
            "student",
            "name rollNumber"
          )
          .populate(
            "faculty",
            "name"
          )
          .sort({
            date: -1,
          });

      res.status(200).json({
        success: true,
        total: attendance.length,
        attendance,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch subject attendance.",
      });
    }
  };

/*
==================================================
Faculty Attendance
==================================================
*/

exports.getFacultyAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find({
          faculty: req.params.facultyId,
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
            date: -1,
          });

      res.status(200).json({
        success: true,
        total: attendance.length,
        attendance,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch faculty attendance.",
      });
    }
  };

/*
==================================================
Attendance Percentage
==================================================
*/

exports.getAttendancePercentage =
  async (req, res) => {
    try {
      const studentId =
        req.params.studentId;

      const total =
        await Attendance.countDocuments({
          student: studentId,
        });

      const present =
        await Attendance.countDocuments({
          student: studentId,
          status: {
            $in: [
              "Present",
              "Late",
            ],
          },
        });

      const percentage =
        total === 0
          ? 0
          : Number(
              (
                (present / total) *
                100
              ).toFixed(2)
            );

      res.status(200).json({
        success: true,
        totalLectures: total,
        attended: present,
        percentage,
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
Low Attendance Report
==================================================
*/

exports.lowAttendanceReport =
  async (req, res) => {
    try {
      const report =
        await Attendance.aggregate([
          {
            $group: {
              _id: "$student",

              total: {
                $sum: 1,
              },

              present: {
                $sum: {
                  $cond: [
                    {
                      $in: [
                        "$status",
                        [
                          "Present",
                          "Late",
                        ],
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
          {
            $project: {
              percentage: {
                $multiply: [
                  {
                    $divide: [
                      "$present",
                      "$total",
                    ],
                  },
                  100,
                ],
              },
            },
          },
          {
            $match: {
              percentage: {
                $lt: 75,
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,
        report,
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
Attendance Statistics
==================================================
*/

exports.getAttendanceStats =
  async (req, res) => {
    try {
      const [
        total,
        present,
        absent,
        late,
        medical,
      ] = await Promise.all([
        Attendance.countDocuments(),

        Attendance.countDocuments({
          status: "Present",
        }),

        Attendance.countDocuments({
          status: "Absent",
        }),

        Attendance.countDocuments({
          status: "Late",
        }),

        Attendance.countDocuments({
          status:
            "Medical Leave",
        }),
      ]);

      res.status(200).json({
        success: true,

        stats: {
          total,
          present,
          absent,
          late,
          medical,
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
Monthly Attendance Report
==================================================
*/

exports.monthlyAttendance =
  async (req, res) => {
    try {
      const report =
        await Attendance.aggregate([
          {
            $group: {
              _id: {
                year: {
                  $year: "$date",
                },
                month: {
                  $month: "$date",
                },
              },

              total: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
        ]);

      res.status(200).json({
        success: true,
        report,
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
Attendance Dashboard
==================================================
*/

exports.dashboardSummary =
  async (req, res) => {
    try {
      const latest =
        await Attendance.find()
          .populate(
            "student",
            "name"
          )
          .populate(
            "subject",
            "name"
          )
          .sort({
            createdAt: -1,
          })
          .limit(10);

      const total =
        await Attendance.countDocuments();

      res.status(200).json({
        success: true,

        dashboard: {
          totalRecords: total,
          latest,
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
Export Attendance
==================================================
*/

exports.exportAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find()
          .populate(
            "student",
            "name rollNumber"
          )
          .populate(
            "faculty",
            "name"
          )
          .populate(
            "subject",
            "name code"
          );

      res.status(200).json({
        success: true,
        total:
          attendance.length,
        attendance,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };
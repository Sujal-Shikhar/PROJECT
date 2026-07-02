const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Subject = require("../models/Subject");
const Attendance = require("../models/Attendance");
const Exam = require("../models/Exam");
const Fee = require("../models/Fee");
const Placement = require("../models/Placement");
const Notice = require("../models/Notice");
const Timetable = require("../models/Timetable");

exports.getDashboardStats = async (
  req,
  res
) => {

  try {

    /*
    ==========================================
    COUNTS
    ==========================================
    */

    const totalStudents =
      await Student.countDocuments({
        isActive: true,
      });

    const totalFaculty =
      await Faculty.countDocuments({
        isActive: true,
      });

    const totalSubjects =
      await Subject.countDocuments({
        isActive: true,
      });

    const totalExams =
      await Exam.countDocuments({
        isActive: true,
      });

    const totalClasses =
      await Timetable.countDocuments({
        isActive: true,
      });

    const totalAttendance =
      await Attendance.countDocuments();

    /*
    ==========================================
    PLACEMENTS
    ==========================================
    */

    const totalPlacements =
      await Placement.countDocuments({

        status: "Selected",

        isActive: true,

      });

    /*
    ==========================================
    FEES
    ==========================================
    */

    const feeStats =
      await Fee.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $group: {

            _id: null,

            totalFee: {
              $sum: "$totalFee",
            },

            totalCollected: {
              $sum: "$amountPaid",
            },

            totalPending: {
              $sum: "$balance",
            },

          },
        },
      ]);

    /*
    ==========================================
    NOTICES
    ==========================================
    */

    const totalNotices =
      await Notice.countDocuments({

        isActive: true,

        isPublished: true,

      });

    /*
    ==========================================
    RECENT DATA
    ==========================================
    */

    const latestStudents =
      await Student.find({
        isActive: true,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5);

    const latestNotices =
      await Notice.find({
        isActive: true,
        isPublished: true,
      })
        .sort({
          publishDate: -1,
        })
        .limit(5);

    /*
    ==========================================
    RESPONSE
    ==========================================
    */

    res.status(200).json({

      success: true,

      counts: {

        students:
          totalStudents,

        faculty:
          totalFaculty,

        subjects:
          totalSubjects,

        exams:
          totalExams,

        timetable:
          totalClasses,

        attendance:
          totalAttendance,

        placements:
          totalPlacements,

        notices:
          totalNotices,

      },

      fees: {

        totalFee:
          feeStats[0]
            ?.totalFee || 0,

        collected:
          feeStats[0]
            ?.totalCollected || 0,

        pending:
          feeStats[0]
            ?.totalPending || 0,

      },

      recent: {

        students:
          latestStudents,

        notices:
          latestNotices,

      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to load dashboard.",

    });

  }

};
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Subject = require("../models/Subject");

/*
=========================================================
OVERALL ATTENDANCE REPORT
=========================================================
*/

exports.getAttendanceReport = async (req, res) => {
  try {
    const students = await Student.find({
      isActive: true,
    }).lean();

    const report = await Promise.all(
      students.map(async (student) => {
        const totalClasses =
          await Attendance.countDocuments({
            student: student._id,
          });

        const presentClasses =
          await Attendance.countDocuments({
            student: student._id,
            status: "Present",
          });

        const percentage =
          totalClasses === 0
            ? 0
            : Number(
                (
                  (presentClasses /
                    totalClasses) *
                  100
                ).toFixed(2)
              );

        return {
          studentId: student._id,
          rollNumber:
            student.rollNumber,
          name: student.name,
          department:
            student.department,
          semester:
            student.semester,
          totalClasses,
          presentClasses,
          absentClasses:
            totalClasses -
            presentClasses,
          percentage,
        };
      })
    );

    res.status(200).json({
      success: true,
      total: report.length,
      report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to generate attendance report.",
    });
  }
};

/*
=========================================================
STUDENT REPORT
=========================================================
*/

exports.getStudentReport = async (
  req,
  res
) => {
  try {
    const student =
      await Student.findOne({
        _id: req.params.studentId,
        isActive: true,
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found.",
      });
    }

    const attendance =
      await Attendance.find({
        student: student._id,
      })
        .populate(
          "subject",
          "name code"
        )
        .sort({
          date: -1,
        });

    const totalClasses =
      attendance.length;

    const presentClasses =
      attendance.filter(
        (item) =>
          item.status ===
          "Present"
      ).length;

    const absentClasses =
      totalClasses -
      presentClasses;

    const percentage =
      totalClasses === 0
        ? 0
        : Number(
            (
              (presentClasses /
                totalClasses) *
              100
            ).toFixed(2)
          );

    res.status(200).json({
      success: true,
      student,
      totalClasses,
      presentClasses,
      absentClasses,
      percentage,
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch student attendance report.",
    });
  }
};

/*
=========================================================
SUBJECT REPORT
=========================================================
*/
/*
=========================================================
SUBJECT REPORT
=========================================================
*/

exports.getSubjectReport = async (
  req,
  res
) => {
  try {

    const subject =
      await Subject.findById(
        req.params.subjectId
      );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message:
          "Subject not found.",
      });
    }

    const records =
      await Attendance.find({
        subject: subject._id,
      })
        .populate(
          "student",
          "name rollNumber department semester"
        )
        .sort({
          date: -1,
        });

    const totalClasses =
      records.length;

    const presentClasses =
      records.filter(
        (item) =>
          item.status ===
          "Present"
      ).length;

    const absentClasses =
      totalClasses -
      presentClasses;

    const percentage =
      totalClasses === 0
        ? 0
        : Number(
            (
              (presentClasses /
                totalClasses) *
              100
            ).toFixed(2)
          );

    res.status(200).json({

      success: true,

      subject,

      totalClasses,

      presentClasses,

      absentClasses,

      percentage,

      records,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to fetch subject attendance report.",

    });

  }

};

/*
=========================================================
DEPARTMENT REPORT
=========================================================
*/

exports.getDepartmentReport =
  async (
    req,
    res
  ) => {

    try {

      const department =
        req.params.department;

      const students =
        await Student.find({

          department,

          isActive: true,

        });

      const report =
        await Promise.all(

          students.map(
            async (
              student
            ) => {

              const totalClasses =
                await Attendance.countDocuments({
                  student:
                    student._id,
                });

              const presentClasses =
                await Attendance.countDocuments({
                  student:
                    student._id,
                  status:
                    "Present",
                });

              const absentClasses =
                totalClasses -
                presentClasses;

              const percentage =
                totalClasses === 0
                  ? 0
                  : Number(
                      (
                        (presentClasses /
                          totalClasses) *
                        100
                      ).toFixed(
                        2
                      )
                    );

              return {

                studentId:
                  student._id,

                rollNumber:
                  student.rollNumber,

                name:
                  student.name,

                semester:
                  student.semester,

                totalClasses,

                presentClasses,

                absentClasses,

                percentage,

              };

            }
          )

        );

      res.status(200).json({

        success: true,

        department,

        total:
          report.length,

        report,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch department attendance report.",

      });

    }

  };

/*
=========================================================
DEFAULTERS (<75%)
=========================================================
*/
/*
=========================================================
DEFAULTERS (<75%)
=========================================================
*/

exports.getDefaulters = async (
  req,
  res
) => {

  try {

    const students =
      await Student.find({
        isActive: true,
      });

    const defaulters = [];

    for (const student of students) {

      const totalClasses =
        await Attendance.countDocuments({
          student: student._id,
        });

      const presentClasses =
        await Attendance.countDocuments({
          student: student._id,
          status: "Present",
        });

      const absentClasses =
        totalClasses -
        presentClasses;

      const percentage =
        totalClasses === 0
          ? 0
          : Number(
              (
                (presentClasses /
                  totalClasses) *
                100
              ).toFixed(2)
            );

      if (percentage < 75) {

        defaulters.push({

          studentId:
            student._id,

          rollNumber:
            student.rollNumber,

          name:
            student.name,

          department:
            student.department,

          semester:
            student.semester,

          totalClasses,

          presentClasses,

          absentClasses,

          percentage,

        });

      }

    }

    res.status(200).json({

      success: true,

      total:
        defaulters.length,

      defaulters,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to fetch defaulters.",

    });

  }

};

/*
=========================================================
MONTHLY REPORT
=========================================================
*/

exports.getMonthlyReport =
  async (
    req,
    res
  ) => {

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

              totalClasses: {
                $sum: 1,
              },

              presentClasses: {

                $sum: {

                  $cond: [

                    {
                      $eq: [
                        "$status",
                        "Present",
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
            $sort: {

              "_id.year": 1,

              "_id.month": 1,

            },

          },

        ]);

      const monthlyReport =
        report.map((item) => ({

          year:
            item._id.year,

          month:
            item._id.month,

          totalClasses:
            item.totalClasses,

          presentClasses:
            item.presentClasses,

          absentClasses:
            item.totalClasses -
            item.presentClasses,

          percentage:
            item.totalClasses === 0
              ? 0
              : Number(
                  (
                    (item.presentClasses /
                      item.totalClasses) *
                    100
                  ).toFixed(2)
                ),

        }));

      res.status(200).json({

        success: true,

        total:
          monthlyReport.length,

        report:
          monthlyReport,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to generate monthly attendance report.",

      });

    }

  };
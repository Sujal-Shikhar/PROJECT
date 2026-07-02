const FacultySubject = require("../models/FacultySubject");
const Faculty = require("../models/Faculty");
const Subject = require("../models/Subject");

/*
==================================================
Create Faculty Subject Assignment
==================================================
*/

exports.createAssignment = async (
  req,
  res
) => {
  try {
    const {
      faculty,
      subject,
      department,
      semester,
      section,
      academicYear,
      isCoordinator,
      remarks,
    } = req.body;

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
    Duplicate Check
    ==========================================
    */

    const existing =
      await FacultySubject.findOne({
        faculty,
        subject,
        semester,
        section,
        academicYear,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Faculty is already assigned to this subject.",
      });
    }

    /*
    ==========================================
    Create Assignment
    ==========================================
    */

    const assignment =
      await FacultySubject.create({
        faculty,
        subject,
        department,
        semester,
        section,
        academicYear,
        isCoordinator,
        remarks,
      });

    res.status(201).json({
      success: true,
      message:
        "Faculty assigned successfully.",
      assignment,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to create assignment.",
    });

  }
};

/*
==================================================
Get All Assignments
==================================================
*/

exports.getAssignments =
  async (
    req,
    res
  ) => {

    try {

      const {
        page = 1,
        limit = 10,
        department,
        semester,
        section,
        academicYear,
        search,
      } = req.query;

      const query = {
        isActive: true,
      };

      if (department)
        query.department =
          department;

      if (semester)
        query.semester =
          Number(semester);

      if (section)
        query.section =
          section.toUpperCase();

      if (academicYear)
        query.academicYear =
          academicYear;

      const assignments =
        await FacultySubject.find(query)
          .populate(
            "faculty",
            "name employeeId department email"
          )
          .populate(
            "subject",
            "name code credits type"
          )
          .sort({
            department: 1,
            semester: 1,
            section: 1,
          })
          .skip(
            (page - 1) *
              Number(limit)
          )
          .limit(
            Number(limit)
          );

      const total =
        await FacultySubject.countDocuments(
          query
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

        assignments,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch assignments.",
      });

    }

  };

/*
==================================================
Get Assignment By ID
==================================================
*/

exports.getAssignmentById =
  async (
    req,
    res
  ) => {

    try {

      const assignment =
        await FacultySubject.findById(
          req.params.id
        )
          .populate(
            "faculty"
          )
          .populate(
            "subject"
          );

      if (!assignment) {

        return res.status(404).json({
          success: false,
          message:
            "Assignment not found.",
        });

      }

      res.status(200).json({
        success: true,
        assignment,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch assignment.",
      });

    }

  };

/*
==================================================
Search Assignments
==================================================
*/

exports.searchAssignments =
  async (
    req,
    res
  ) => {

    try {

      const keyword =
        req.query.search || "";

      const assignments =
        await FacultySubject.find({
          isActive: true,
        })
          .populate({
            path: "faculty",
            match: {
              name: {
                $regex: keyword,
                $options: "i",
              },
            },
          })
          .populate({
            path: "subject",
            match: {
              $or: [
                {
                  name: {
                    $regex: keyword,
                    $options: "i",
                  },
                },
                {
                  code: {
                    $regex: keyword,
                    $options: "i",
                  },
                },
              ],
            },
          });

      const filtered =
        assignments.filter(
          (item) =>
            item.faculty ||
            item.subject
        );

      res.status(200).json({
        success: true,
        total:
          filtered.length,
        assignments:
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
Update Assignment
==================================================
*/

exports.updateAssignment =
  async (
    req,
    res
  ) => {
    try {
      const assignment =
        await FacultySubject.findById(
          req.params.id
        );

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message:
            "Assignment not found.",
        });
      }

      const {
        faculty,
        subject,
        department,
        semester,
        section,
        academicYear,
        isCoordinator,
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

        assignment.faculty =
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

        assignment.subject =
          subject;
      }

      if (department)
        assignment.department =
          department;

      if (semester)
        assignment.semester =
          semester;

      if (section)
        assignment.section =
          section.toUpperCase();

      if (academicYear)
        assignment.academicYear =
          academicYear;

      if (
        typeof isCoordinator ===
        "boolean"
      ) {
        assignment.isCoordinator =
          isCoordinator;
      }

      if (remarks !== undefined) {
        assignment.remarks =
          remarks;
      }

      await assignment.save();

      res.status(200).json({
        success: true,
        message:
          "Assignment updated successfully.",
        assignment,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to update assignment.",
      });

    }
  };

/*
==================================================
Delete Assignment (Soft Delete)
==================================================
*/

exports.deleteAssignment =
  async (
    req,
    res
  ) => {
    try {

      const assignment =
        await FacultySubject.findById(
          req.params.id
        );

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message:
            "Assignment not found.",
        });
      }

      assignment.isActive =
        false;

      await assignment.save();

      res.status(200).json({
        success: true,
        message:
          "Assignment deleted successfully.",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to delete assignment.",
      });

    }
  };

/*
==================================================
Restore Assignment
==================================================
*/

exports.restoreAssignment =
  async (
    req,
    res
  ) => {
    try {

      const assignment =
        await FacultySubject.findById(
          req.params.id
        );

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message:
            "Assignment not found.",
        });
      }

      assignment.isActive =
        true;

      await assignment.save();

      res.status(200).json({
        success: true,
        message:
          "Assignment restored successfully.",
        assignment,
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
Faculty Assignments
==================================================
*/

exports.getFacultyAssignments =
  async (
    req,
    res
  ) => {

    try {

      const assignments =
        await FacultySubject.find({
          faculty:
            req.params.facultyId,
          isActive: true,
        })
          .populate(
            "subject",
            "name code credits department semester"
          )
          .sort({
            semester: 1,
          });

      res.status(200).json({
        success: true,
        total:
          assignments.length,
        assignments,
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
Subject Assignments
==================================================
*/

exports.getSubjectAssignments =
  async (
    req,
    res
  ) => {

    try {

      const assignments =
        await FacultySubject.find({
          subject:
            req.params.subjectId,
          isActive: true,
        })
          .populate(
            "faculty",
            "name employeeId department email"
          );

      res.status(200).json({
        success: true,
        total:
          assignments.length,
        assignments,
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
Department Assignments
==================================================
*/

exports.getDepartmentAssignments =
  async (
    req,
    res
  ) => {

    try {

      const assignments =
        await FacultySubject.find({
          department:
            req.params.department,
          isActive: true,
        })
          .populate(
            "faculty",
            "name employeeId"
          )
          .populate(
            "subject",
            "name code"
          )
          .sort({
            semester: 1,
            section: 1,
          });

      res.status(200).json({
        success: true,
        total:
          assignments.length,
        assignments,
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
Semester Assignments
==================================================
*/

exports.getSemesterAssignments =
  async (
    req,
    res
  ) => {

    try {

      const assignments =
        await FacultySubject.find({
          semester: Number(
            req.params.semester
          ),
          isActive: true,
        })
          .populate(
            "faculty",
            "name employeeId"
          )
          .populate(
            "subject",
            "name code"
          )
          .sort({
            department: 1,
            section: 1,
          });

      res.status(200).json({
        success: true,
        total:
          assignments.length,
        assignments,
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
Assignment Statistics
==================================================
*/

exports.getAssignmentStats =
  async (
    req,
    res
  ) => {
    try {
      const [
        totalAssignments,
        activeAssignments,
        inactiveAssignments,
        departmentStats,
        semesterStats,
        coordinatorCount,
      ] = await Promise.all([
        FacultySubject.countDocuments(),

        FacultySubject.countDocuments({
          isActive: true,
        }),

        FacultySubject.countDocuments({
          isActive: false,
        }),

        FacultySubject.aggregate([
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

        FacultySubject.aggregate([
          {
            $group: {
              _id: "$semester",
              total: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]),

        FacultySubject.countDocuments({
          isCoordinator: true,
          isActive: true,
        }),
      ]);

      res.status(200).json({
        success: true,

        stats: {
          totalAssignments,
          activeAssignments,
          inactiveAssignments,
          coordinatorCount,
          departmentStats,
          semesterStats,
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
Faculty Workload
==================================================
*/

exports.getFacultyWorkload =
  async (
    req,
    res
  ) => {
    try {

      const workload =
        await FacultySubject.aggregate([
          {
            $match: {
              isActive: true,
            },
          },
          {
            $group: {
              _id: "$faculty",
              totalSubjects: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              totalSubjects: -1,
            },
          },
        ]);

      await Faculty.populate(
        workload,
        {
          path: "_id",
          select:
            "name employeeId department",
        }
      );

      res.status(200).json({
        success: true,
        workload,
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

      const latestAssignments =
        await FacultySubject.find({
          isActive: true,
        })
          .populate(
            "faculty",
            "name employeeId"
          )
          .populate(
            "subject",
            "name code"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.status(200).json({
        success: true,
        dashboard: {
          latestAssignments,
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
Export Assignments
==================================================
*/

exports.exportAssignments =
  async (
    req,
    res
  ) => {

    try {

      const assignments =
        await FacultySubject.find()
          .populate(
            "faculty"
          )
          .populate(
            "subject"
          )
          .lean();

      res.status(200).json({
        success: true,
        total:
          assignments.length,
        assignments,
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
Import Assignments
==================================================
*/

exports.importAssignments =
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
            "Expected an array of assignments.",
        });
      }

      const inserted =
        await FacultySubject.insertMany(
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
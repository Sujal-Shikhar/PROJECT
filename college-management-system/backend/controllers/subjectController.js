const Subject = require("../models/Subject");
const Faculty = require("../models/Faculty");

/*
==================================================
Create Subject
==================================================
*/

exports.createSubject = async (
  req,
  res
) => {
  try {
    const {
      name,
      code,
      department,
      semester,
      credits,
      type,
      faculty,
    } = req.body;

    /*
    ==========================================
    Duplicate Check
    ==========================================
    */

    const existingSubject =
      await Subject.findOne({
        code: code.toUpperCase(),
      });

    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message:
          "Subject code already exists.",
      });
    }

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
    }

    /*
    ==========================================
    Create Subject
    ==========================================
    */

    const subject =
      await Subject.create({
        name,
        code:
          code.toUpperCase(),
        department,
        semester,
        credits,
        type,
        faculty:
          faculty || null,
      });

    res.status(201).json({
      success: true,
      message:
        "Subject created successfully.",
      subject,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to create subject.",
    });
  }
};

/*
==================================================
Get All Subjects
==================================================
*/

exports.getSubjects =
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
        type,
        search,
      } = req.query;

      const query = {
        isActive: true,
      };

      /*
      ==========================================
      Filters
      ==========================================
      */

      if (department) {
        query.department =
          department;
      }

      if (semester) {
        query.semester =
          Number(
            semester
          );
      }

      if (type) {
        query.type = type;
      }

      /*
      ==========================================
      Search
      ==========================================
      */

      if (search) {
        query.$or = [
          {
            name: {
              $regex: search,
              $options:
                "i",
            },
          },
          {
            code: {
              $regex: search,
              $options:
                "i",
            },
          },
        ];
      }

      const total =
        await Subject.countDocuments(
          query
        );

      const subjects =
        await Subject.find(
          query
        )
          .populate(
            "faculty",
            "name employeeId"
          )
          .sort({
            semester: 1,
            name: 1,
          })
          .skip(
            (page - 1) *
              Number(
                limit
              )
          )
          .limit(
            Number(
              limit
            )
          );

      res.status(200).json({
        success: true,
        total,
        currentPage:
          Number(page),
        totalPages:
          Math.ceil(
            total /
              Number(
                limit
              )
          ),
        subjects,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch subjects.",
      });
    }
  };

/*
==================================================
Get Subject By ID
==================================================
*/

exports.getSubjectById =
  async (
    req,
    res
  ) => {
    try {
      const subject =
        await Subject.findById(
          req.params.id
        ).populate(
          "faculty",
          "name email employeeId department"
        );

      if (!subject) {
        return res.status(
          404
        ).json({
          success: false,
          message:
            "Subject not found.",
        });
      }

      res.status(200).json({
        success: true,
        subject,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch subject.",
      });
    }
  };

/*
==================================================
Update Subject
==================================================
*/

exports.updateSubject = async (
  req,
  res
) => {
  try {
    const subject =
      await Subject.findById(
        req.params.id
      );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    const {
      code,
      faculty,
    } = req.body;

    /*
    ==========================================
    Duplicate Code Check
    ==========================================
    */

    if (code) {
      const existing =
        await Subject.findOne({
          code: code.toUpperCase(),
          _id: {
            $ne: subject._id,
          },
        });

      if (existing) {
        return res.status(400).json({
          success: false,
          message:
            "Subject code already exists.",
        });
      }

      subject.code =
        code.toUpperCase();
    }

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

      subject.faculty =
        faculty;
    }

    /*
    ==========================================
    Update Remaining Fields
    ==========================================
    */

    if (req.body.name)
      subject.name =
        req.body.name;

    if (req.body.department)
      subject.department =
        req.body.department;

    if (req.body.semester)
      subject.semester =
        req.body.semester;

    if (req.body.credits)
      subject.credits =
        req.body.credits;

    if (req.body.type)
      subject.type =
        req.body.type;

    await subject.save();

    res.status(200).json({
      success: true,
      message:
        "Subject updated successfully.",
      subject,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to update subject.",
    });
  }
};

/*
==================================================
Delete Subject (Soft Delete)
==================================================
*/

exports.deleteSubject =
  async (
    req,
    res
  ) => {
    try {
      const subject =
        await Subject.findById(
          req.params.id
        );

      if (!subject) {
        return res.status(404).json({
          success: false,
          message:
            "Subject not found.",
        });
      }

      subject.isActive =
        false;

      await subject.save();

      res.status(200).json({
        success: true,
        message:
          "Subject deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to delete subject.",
      });
    }
  };

/*
==================================================
Restore Subject
==================================================
*/

exports.restoreSubject =
  async (
    req,
    res
  ) => {
    try {
      const subject =
        await Subject.findById(
          req.params.id
        );

      if (!subject) {
        return res.status(404).json({
          success: false,
          message:
            "Subject not found.",
        });
      }

      subject.isActive =
        true;

      await subject.save();

      res.status(200).json({
        success: true,
        message:
          "Subject restored successfully.",
        subject,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to restore subject.",
      });
    }
  };

/*
==================================================
Assign Faculty
==================================================
*/

exports.assignFaculty =
  async (
    req,
    res
  ) => {
    try {
      const {
        facultyId,
      } = req.body;

      const subject =
        await Subject.findById(
          req.params.id
        );

      if (!subject) {
        return res.status(404).json({
          success: false,
          message:
            "Subject not found.",
        });
      }

      const faculty =
        await Faculty.findById(
          facultyId
        );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message:
            "Faculty not found.",
        });
      }

      subject.faculty =
        facultyId;

      await subject.save();

      res.status(200).json({
        success: true,
        message:
          "Faculty assigned successfully.",
        subject,
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
Remove Faculty
==================================================
*/

exports.removeFaculty =
  async (
    req,
    res
  ) => {
    try {
      const subject =
        await Subject.findById(
          req.params.id
        );

      if (!subject) {
        return res.status(404).json({
          success: false,
          message:
            "Subject not found.",
        });
      }

      subject.faculty =
        null;

      await subject.save();

      res.status(200).json({
        success: true,
        message:
          "Faculty removed successfully.",
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
Subjects By Department
==================================================
*/

exports.getDepartmentSubjects =
  async (
    req,
    res
  ) => {
    try {
      const subjects =
        await Subject.find({
          department:
            req.params.department,
          isActive: true,
        })
          .populate(
            "faculty",
            "name employeeId"
          )
          .sort({
            semester: 1,
            name: 1,
          });

      res.status(200).json({
        success: true,
        total:
          subjects.length,
        subjects,
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
Subjects By Semester
==================================================
*/

exports.getSemesterSubjects =
  async (
    req,
    res
  ) => {
    try {
      const subjects =
        await Subject.find({
          semester: Number(
            req.params.semester
          ),
          isActive: true,
        })
          .populate(
            "faculty",
            "name employeeId"
          )
          .sort({
            department: 1,
            name: 1,
          });

      res.status(200).json({
        success: true,
        total:
          subjects.length,
        subjects,
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
Subject Statistics
==================================================
*/

exports.getSubjectStats = async (
  req,
  res
) => {
  try {
    const [
      totalSubjects,
      activeSubjects,
      inactiveSubjects,
      departmentStats,
      semesterStats,
      typeStats,
      creditStats,
    ] = await Promise.all([
      Subject.countDocuments(),

      Subject.countDocuments({
        isActive: true,
      }),

      Subject.countDocuments({
        isActive: false,
      }),

      Subject.aggregate([
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

      Subject.aggregate([
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

      Subject.aggregate([
        {
          $group: {
            _id: "$type",
            total: {
              $sum: 1,
            },
          },
        },
      ]),

      Subject.aggregate([
        {
          $group: {
            _id: null,
            totalCredits: {
              $sum: "$credits",
            },
            averageCredits: {
              $avg: "$credits",
            },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        totalSubjects,
        activeSubjects,
        inactiveSubjects,
        departmentStats,
        semesterStats,
        typeStats,
        creditStats,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch subject statistics.",
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
      const latestSubjects =
        await Subject.find({
          isActive: true,
        })
          .populate(
            "faculty",
            "name employeeId"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const totalCredits =
        await Subject.aggregate([
          {
            $group: {
              _id: null,
              credits: {
                $sum: "$credits",
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,

        dashboard: {
          latestSubjects,
          totalCredits:
            totalCredits[0]
              ?.credits || 0,
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
Export Subjects
==================================================
*/

exports.exportSubjects =
  async (
    req,
    res
  ) => {
    try {
      const subjects =
        await Subject.find()
          .populate(
            "faculty",
            "name employeeId email"
          )
          .lean();

      res.status(200).json({
        success: true,
        total:
          subjects.length,
        subjects,
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
Import Subjects
==================================================
*/

exports.importSubjects =
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
            "Expected an array of subjects.",
        });
      }

      const inserted =
        await Subject.insertMany(
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
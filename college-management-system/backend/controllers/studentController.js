const Student = require("../models/Student");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

/*
==================================================
Upload Buffer To Cloudinary
==================================================
*/

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: "college-management/students",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/*
==================================================
Create Student
==================================================
*/

exports.createStudent = async (req, res) => {
  try {
    const {
      email,
      rollNumber,
      admissionNumber,
    } = req.body;

    const exists = await Student.findOne({
      $or: [
        {
          email: email.toLowerCase(),
        },
        {
          rollNumber:
            rollNumber.toUpperCase(),
        },
        {
          admissionNumber:
            admissionNumber.toUpperCase(),
        },
      ],
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "Student already exists.",
      });
    }

    let profileImage = {
      public_id: "",
      url: "",
    };

    if (req.file) {
      const upload =
        await uploadToCloudinary(
          req.file.buffer
        );

      profileImage = {
        public_id:
          upload.public_id,
        url: upload.secure_url,
      };
    }

    const student =
      await Student.create({
        ...req.body,

        email: email.toLowerCase(),

        rollNumber:
          rollNumber.toUpperCase(),

        admissionNumber:
          admissionNumber.toUpperCase(),

        profileImage,

        createdBy:
          req.user.id,
      });

    res.status(201).json({
      success: true,

      message:
        "Student created successfully.",

      student,
    });
  }  catch (error) {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
  
};

/*
==================================================
Get Students
==================================================
*/

exports.getStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      department,
      semester,
      section,
      batch,
      isActive,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          rollNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          admissionNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (department)
      query.department =
        department;

    if (semester)
      query.semester =
        Number(semester);

    if (section)
      query.section =
        section.toUpperCase();

    if (batch)
      query.batch =
        batch;

    if (
      isActive !==
      undefined
    ) {
      query.isActive =
        isActive === "true";
    }

    const sort = {};

    sort[sortBy] =
      order === "asc"
        ? 1
        : -1;

    const [
      students,
      total,
    ] = await Promise.all([
      Student.find(query)
        .sort(sort)
        .skip(
          (page - 1) *
            Number(limit)
        )
        .limit(
          Number(limit)
        )
        .populate(
          "createdBy",
          "name email"
        )
        .lean(),

      Student.countDocuments(
        query
      ),
    ]);

    res.status(200).json({
      success: true,

      students,

      pagination: {
        total,

        currentPage:
          Number(page),

        totalPages:
          Math.ceil(
            total / limit
          ),

        limit:
          Number(limit),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message:
        "Unable to fetch students.",
    });
  }
};

/*
==================================================
Get Student By ID
==================================================
*/

exports.getStudentById =
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
            "Invalid student ID.",
        });
      }

      const student =
        await Student.findById(
          req.params.id
        )
          .populate(
            "createdBy",
            "name email"
          )
          .populate(
            "updatedBy",
            "name email"
          );

      if (!student) {
        return res.status(404).json({
          success: false,

          message:
            "Student not found.",
        });
      }

      res.status(200).json({
        success: true,

        student,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        message:
          "Unable to fetch student.",
      });
    }
  };

/*
==================================================
Update Student
==================================================
*/

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID.",
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    /*
    ==============================================
    Duplicate Email Check
    ==============================================
    */

    if (
      req.body.email &&
      req.body.email.toLowerCase() !== student.email
    ) {
      const emailExists = await Student.findOne({
        email: req.body.email.toLowerCase(),
        _id: { $ne: id },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
      }

      student.email = req.body.email.toLowerCase();
    }

    /*
    ==============================================
    Duplicate Roll Number
    ==============================================
    */

    if (
      req.body.rollNumber &&
      req.body.rollNumber.toUpperCase() !==
        student.rollNumber
    ) {
      const rollExists = await Student.findOne({
        rollNumber:
          req.body.rollNumber.toUpperCase(),
        _id: { $ne: id },
      });

      if (rollExists) {
        return res.status(400).json({
          success: false,
          message:
            "Roll number already exists.",
        });
      }

      student.rollNumber =
        req.body.rollNumber.toUpperCase();
    }

    /*
    ==============================================
    Duplicate Admission Number
    ==============================================
    */

    if (
      req.body.admissionNumber &&
      req.body.admissionNumber.toUpperCase() !==
        student.admissionNumber
    ) {
      const admissionExists =
        await Student.findOne({
          admissionNumber:
            req.body.admissionNumber.toUpperCase(),
          _id: { $ne: id },
        });

      if (admissionExists) {
        return res.status(400).json({
          success: false,
          message:
            "Admission number already exists.",
        });
      }

      student.admissionNumber =
        req.body.admissionNumber.toUpperCase();
    }

    /*
    ==============================================
    Update Fields
    ==============================================
    */

    const fields = [
      "name",
      "phone",
      "department",
      "semester",
      "section",
      "batch",
      "academicYear",
      "gender",
      "dob",
      "bloodGroup",
      "category",
      "fatherName",
      "motherName",
      "guardianPhone",
      "guardianEmail",
      "emergencyContact",
      "admissionDate",
      "admissionType",
      "isActive",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        student[field] = req.body[field];
      }
    });

    /*
    ==============================================
    Address
    ==============================================
    */

    if (req.body.address) {
      student.address = {
        ...student.address,
        ...req.body.address,
      };
    }

    student.updatedBy = req.user._id;

    await student.save();

    res.status(200).json({
      success: true,
      message:
        "Student updated successfully.",
      student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to update student.",
    });
  }
};

/*
==================================================
Delete Student (Soft Delete)
==================================================
*/

exports.deleteStudent = async (
  req,
  res
) => {
  try {
    const student =
      await Student.findById(
        req.params.id
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found.",
      });
    }

    student.isActive = false;
    student.updatedBy = req.user.id;

    await student.save();

    res.status(200).json({
      success: true,
      message:
        "Student deactivated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to delete student.",
    });
  }
};

/*
==================================================
Restore Student
==================================================
*/

exports.restoreStudent = async (
  req,
  res
) => {
  try {
    const student =
      await Student.findById(
        req.params.id
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found.",
      });
    }

    student.isActive = true;
    student.updatedBy = req.user._id;

    await student.save();

    res.status(200).json({
      success: true,
      message:
        "Student restored successfully.",
      student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to restore student.",
    });
  }
};

/*
==================================================
Update Profile Image
==================================================
*/

exports.updateProfileImage =
  async (
    req,
    res
  ) => {
    try {
      const student =
        await Student.findById(
          req.params.id
        );

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload an image.",
        });
      }

      if (
        student.profileImage.public_id
      ) {
        await cloudinary.uploader.destroy(
          student.profileImage.public_id
        );
      }

      const upload =
        await uploadToCloudinary(
          req.file.buffer
        );

      student.profileImage = {
        public_id:
          upload.public_id,
        url: upload.secure_url,
      };

      student.updatedBy = req.user.id;

      await student.save();

      res.status(200).json({
        success: true,
        message:
          "Profile image updated successfully.",
        profileImage:
          student.profileImage,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to upload image.",
      });
    }
  };

/*
==================================================
Bulk Delete Students
==================================================
*/

exports.bulkDeleteStudents =
  async (
    req,
    res
  ) => {
    try {
      const { ids } = req.body;

      if (
        !Array.isArray(ids) ||
        ids.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Student IDs are required.",
        });
      }

      await Student.updateMany(
        {
          _id: {
            $in: ids,
          },
        },
        {
          isActive: false,
          updatedBy: req.user.id,
        }
      );

      res.status(200).json({
        success: true,
        message:
          "Students deleted successfully.",
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
Bulk Restore Students
==================================================
*/

exports.bulkRestoreStudents =
  async (
    req,
    res
  ) => {
    try {
      const { ids } = req.body;

      if (
        !Array.isArray(ids) ||
        ids.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Student IDs are required.",
        });
      }

      await Student.updateMany(
        {
          _id: {
            $in: ids,
          },
        },
        {
          isActive: true,
          updatedBy: req.user.id,
        }
      );

      res.status(200).json({
        success: true,
        message:
          "Students restored successfully.",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Bulk restore failed.",
      });
    }
  };

/*
==================================================
Dashboard Summary
==================================================
*/

exports.dashboardSummary = async (
  req,
  res
) => {
  try {
    const [
      totalStudents,
      activeStudents,
      inactiveStudents,
    ] = await Promise.all([
      Student.countDocuments(),

      Student.countDocuments({
        isActive: true,
      }),

      Student.countDocuments({
        isActive: false,
      }),
    ]);

    res.status(200).json({
      success: true,

      data: {
        totalStudents,

        activeStudents,

        inactiveStudents,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message:
        "Unable to fetch dashboard summary.",
    });
  }
};

/*
==================================================
Department Statistics
==================================================
*/

exports.getStudentStats = async (
  req,
  res
) => {
  try {
    const departmentStats =
      await Student.aggregate([
        {
          $group: {
            _id:
              "$department",

            total: {
              $sum: 1,
            },

            active: {
              $sum: {
                $cond: [
                  "$isActive",
                  1,
                  0,
                ],
              },
            },
          },
        },

        {
          $sort: {
            total: -1,
          },
        },
      ]);

    const semesterStats =
      await Student.aggregate([
        {
          $group: {
            _id:
              "$semester",

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
      ]);

    res.status(200).json({
      success: true,

      departmentStats,

      semesterStats,
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
Department Students
==================================================
*/

exports.getDepartmentStudents =
  async (
    req,
    res
  ) => {
    try {
      const students =
        await Student.find({
          department:
            req.params.department,
        }).sort({
          semester: 1,
          name: 1,
        });

      res.status(200).json({
        success: true,

        count:
          students.length,

        students,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        message:
          "Unable to fetch students.",
      });
    }
  };

/*
==================================================
Semester Students
==================================================
*/

exports.getSemesterStudents =
  async (
    req,
    res
  ) => {
    try {
      const students =
        await Student.find({
          semester:
            Number(
              req.params
                .semester
            ),
        }).sort({
          department: 1,
          name: 1,
        });

      res.status(200).json({
        success: true,

        count:
          students.length,

        students,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        message:
          "Unable to fetch students.",
      });
    }
  };

/*
==================================================
Export Students CSV
==================================================
*/

exports.exportStudents =
  async (
    req,
    res
  ) => {
    try {
      const students =
        await Student.find().sort({
          rollNumber: 1,
        });

      let csv =
        "Admission Number,Roll Number,Name,Email,Phone,Department,Semester,Section,Batch,Academic Year,Status\n";

      students.forEach(
        (student) => {
          csv +=
            `"${student.admissionNumber}",` +
            `"${student.rollNumber}",` +
            `"${student.name}",` +
            `"${student.email}",` +
            `"${student.phone}",` +
            `"${student.department}",` +
            `"${student.semester}",` +
            `"${student.section}",` +
            `"${student.batch}",` +
            `"${student.academicYear}",` +
            `"${student.isActive}"\n`;
        }
      );

      res.setHeader(
        "Content-Type",
        "text/csv"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=students.csv"
      );

      return res.send(csv);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        message:
          "Unable to export students.",
      });
    }
  };

/*
==================================================
Import Students
==================================================
*/

exports.importStudents =
  async (
    req,
    res
  ) => {
    try {
      if (
        !Array.isArray(
          req.body.students
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Students array is required.",
        });
      }

      const inserted = [];
      const skipped = [];

      for (const item of req.body
        .students) {
        const exists =
          await Student.findOne({
            $or: [
              {
                email:
                  item.email.toLowerCase(),
              },

              {
                rollNumber:
                  item.rollNumber.toUpperCase(),
              },

              {
                admissionNumber:
                  item.admissionNumber.toUpperCase(),
              },
            ],
          });

        if (exists) {
          skipped.push(
            item.rollNumber
          );

          continue;
        }

        const student =
          await Student.create({
            ...item,

            email:
              item.email.toLowerCase(),

            rollNumber:
              item.rollNumber.toUpperCase(),

            admissionNumber:
              item.admissionNumber.toUpperCase(),

            createdBy:
              req.user.id,
          });

        inserted.push(student);
      }

      res.status(201).json({
        success: true,

        imported:
          inserted.length,

        skipped:
          skipped.length,

        skippedRollNumbers:
          skipped,

        students:
          inserted,
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
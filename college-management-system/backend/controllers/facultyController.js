const Faculty = require("../models/Faculty");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

/*
==================================================
Upload Image To Cloudinary
==================================================
*/

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: "college-management/faculty",
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        }
      );

    streamifier
      .createReadStream(buffer)
      .pipe(stream);
  });
};

/*
==================================================
Create Faculty
==================================================
*/

exports.createFaculty = async (
  req,
  res
) => {
  try {
    const {
      employeeId,
      email,
    } = req.body;

    const exists =
      await Faculty.findOne({
        $or: [
          {
            employeeId:
              employeeId.toUpperCase(),
          },
          {
            email:
              email.toLowerCase(),
          },
        ],
      });

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "Faculty already exists.",
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
        url:
          upload.secure_url,
      };
    }

    const faculty =
      await Faculty.create({
        ...req.body,

        employeeId:
          employeeId.toUpperCase(),

        email:
          email.toLowerCase(),

        profileImage,

        createdBy:
          req.user.id,
      });

    res.status(201).json({
      success: true,

      message:
        "Faculty created successfully.",

      faculty,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message:
        "Unable to create faculty.",
    });
  }
};

/*
==================================================
Get All Faculty
==================================================
*/

exports.getFaculty = async (
  req,
  res
) => {
  try {
    const {
      page = 1,
      limit = 10,
      department,
      designation,
      search,
      isActive,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    if (department)
      query.department =
        department;

    if (designation)
      query.designation =
        designation;

    if (
      isActive !==
      undefined
    ) {
      query.isActive =
        isActive === "true";
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          employeeId: {
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
      ];
    }

    const sort = {};

    sort[sortBy] =
      order === "asc"
        ? 1
        : -1;

    const [
      faculty,
      total,
    ] = await Promise.all([
      Faculty.find(query)
        .populate(
          "createdBy",
          "name"
        )
        .sort(sort)
        .skip(
          (page - 1) *
            Number(limit)
        )
        .limit(
          Number(limit)
        )
        .lean(),

      Faculty.countDocuments(
        query
      ),
    ]);

    res.status(200).json({
      success: true,

      faculty,

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
        "Unable to fetch faculty.",
    });
  }
};

/*
==================================================
Get Faculty By ID
==================================================
*/

exports.getFacultyById =
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
            "Invalid faculty ID.",
        });
      }

      const faculty =
        await Faculty.findById(
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

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message:
            "Faculty not found.",
        });
      }

      res.status(200).json({
        success: true,
        faculty,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch faculty.",
      });
    }
  };

/*
==================================================
Update Faculty
==================================================
*/

exports.updateFaculty = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID.",
      });
    }

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    // Duplicate Employee ID
    if (
      req.body.employeeId &&
      req.body.employeeId !== faculty.employeeId
    ) {
      const exists =
        await Faculty.findOne({
          employeeId:
            req.body.employeeId.toUpperCase(),
          _id: {
            $ne: id,
          },
        });

      if (exists) {
        return res.status(400).json({
          success: false,
          message:
            "Employee ID already exists.",
        });
      }
    }

    // Duplicate Email
    if (
      req.body.email &&
      req.body.email !== faculty.email
    ) {
      const exists =
        await Faculty.findOne({
          email:
            req.body.email.toLowerCase(),
          _id: {
            $ne: id,
          },
        });

      if (exists) {
        return res.status(400).json({
          success: false,
          message:
            "Email already exists.",
        });
      }
    }

    Object.assign(faculty, req.body);

    if (req.body.email)
      faculty.email =
        req.body.email.toLowerCase();

    if (req.body.employeeId)
      faculty.employeeId =
        req.body.employeeId.toUpperCase();

    faculty.updatedBy = req.user.id;

    await faculty.save();

    res.status(200).json({
      success: true,
      message:
        "Faculty updated successfully.",
      faculty,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to update faculty.",
    });
  }
};

/*
==================================================
Delete Faculty (Soft Delete)
==================================================
*/

exports.deleteFaculty = async (
  req,
  res
) => {
  try {
    const faculty =
      await Faculty.findById(
        req.params.id
      );

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message:
          "Faculty not found.",
      });
    }

    faculty.isActive = false;
    faculty.updatedBy = req.user.id;

    await faculty.save();

    res.status(200).json({
      success: true,
      message:
        "Faculty deactivated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to delete faculty.",
    });
  }
};

/*
==================================================
Restore Faculty
==================================================
*/

exports.restoreFaculty =
  async (
    req,
    res
  ) => {
    try {
      const faculty =
        await Faculty.findById(
          req.params.id
        );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message:
            "Faculty not found.",
        });
      }

      faculty.isActive = true;
      faculty.updatedBy = req.user.id;

      await faculty.save();

      res.status(200).json({
        success: true,
        message:
          "Faculty restored successfully.",
        faculty,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to restore faculty.",
      });
    }
  };

/*
==================================================
Update Faculty Profile Image
==================================================
*/

exports.updateProfileImage =
  async (
    req,
    res
  ) => {
    try {
      const faculty =
        await Faculty.findById(
          req.params.id
        );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message:
            "Faculty not found.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload an image.",
        });
      }

      // Delete old image
      if (
        faculty.profileImage.public_id
      ) {
        await cloudinary.uploader.destroy(
          faculty.profileImage.public_id
        );
      }

      const upload =
        await uploadToCloudinary(
          req.file.buffer
        );

      faculty.profileImage = {
        public_id:
          upload.public_id,
        url:
          upload.secure_url,
      };

      faculty.updatedBy = req.user.id;

      await faculty.save();

      res.status(200).json({
        success: true,
        message:
          "Profile image updated successfully.",
        profileImage:
          faculty.profileImage,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to update image.",
      });
    }
  };

/*
==================================================
Bulk Delete Faculty
==================================================
*/

exports.bulkDeleteFaculty =
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
            "Faculty IDs are required.",
        });
      }

      await Faculty.updateMany(
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
          "Faculty deactivated successfully.",
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
Bulk Restore Faculty
==================================================
*/

exports.bulkRestoreFaculty =
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
            "Faculty IDs are required.",
        });
      }

      await Faculty.updateMany(
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
          "Faculty restored successfully.",
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
Faculty Statistics
==================================================
*/

exports.getFacultyStats = async (
  req,
  res
) => {
  try {
    const [
      totalFaculty,
      activeFaculty,
      inactiveFaculty,
      departmentStats,
      designationStats,
      averageExperience,
      averageSalary,
    ] = await Promise.all([
      Faculty.countDocuments(),

      Faculty.countDocuments({
        isActive: true,
      }),

      Faculty.countDocuments({
        isActive: false,
      }),

      Faculty.aggregate([
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

      Faculty.aggregate([
        {
          $group: {
            _id: "$designation",
            total: {
              $sum: 1,
            },
          },
        },
      ]),

      Faculty.aggregate([
        {
          $group: {
            _id: null,
            averageExperience: {
              $avg: "$experience",
            },
          },
        },
      ]),

      Faculty.aggregate([
        {
          $group: {
            _id: null,
            averageSalary: {
              $avg: "$salary",
            },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        totalFaculty,

        activeFaculty,

        inactiveFaculty,

        departmentStats,

        designationStats,

        averageExperience:
          averageExperience.length
            ? Number(
                averageExperience[0].averageExperience.toFixed(
                  1
                )
              )
            : 0,

        averageSalary:
          averageSalary.length
            ? Number(
                averageSalary[0].averageSalary.toFixed(
                  2
                )
              )
            : 0,
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
Department Wise Faculty
==================================================
*/

exports.getDepartmentFaculty =
  async (
    req,
    res
  ) => {
    try {
      const faculty =
        await Faculty.find({
          department:
            req.params.department,
          isActive: true,
        }).sort({
          name: 1,
        });

      res.status(200).json({
        success: true,
        total:
          faculty.length,
        faculty,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch department faculty.",
      });
    }
  };

/*
==================================================
Designation Wise Faculty
==================================================
*/

exports.getDesignationFaculty =
  async (
    req,
    res
  ) => {
    try {
      const faculty =
        await Faculty.find({
          designation:
            req.params.designation,
          isActive: true,
        }).sort({
          experience: -1,
        });

      res.status(200).json({
        success: true,
        total:
          faculty.length,
        faculty,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch faculty.",
      });
    }
  };

/*
==================================================
Experience Statistics
==================================================
*/

exports.experienceStatistics =
  async (
    req,
    res
  ) => {
    try {
      const stats =
        await Faculty.aggregate([
          {
            $bucket: {
              groupBy:
                "$experience",

              boundaries: [
                0,
                5,
                10,
                15,
                20,
                100,
              ],

              default:
                "Others",

              output: {
                total: {
                  $sum: 1,
                },
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,
        stats,
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
Salary Statistics
==================================================
*/

exports.salaryStatistics =
  async (
    req,
    res
  ) => {
    try {
      const salary =
        await Faculty.aggregate([
          {
            $group: {
              _id: "$department",

              averageSalary: {
                $avg: "$salary",
              },

              highestSalary: {
                $max: "$salary",
              },

              lowestSalary: {
                $min: "$salary",
              },

              totalSalary: {
                $sum: "$salary",
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,
        salary,
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
      const latestFaculty =
        await Faculty.find()
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const total =
        await Faculty.countDocuments();

      const active =
        await Faculty.countDocuments({
          isActive: true,
        });

      res.status(200).json({
        success: true,

        summary: {
          total,
          active,
          inactive:
            total - active,
          latestFaculty,
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
Export Faculty
==================================================
*/

exports.exportFaculty =
  async (
    req,
    res
  ) => {
    try {
      const faculty =
        await Faculty.find()
          .select(
            "-__v"
          )
          .lean();

      res.status(200).json({
        success: true,
        total:
          faculty.length,
        faculty,
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
Import Faculty
==================================================
*/

exports.importFaculty =
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
        await Faculty.insertMany(
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
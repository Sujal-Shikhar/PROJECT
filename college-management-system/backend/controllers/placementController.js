const Placement = require("../models/Placement");
const Student = require("../models/Student");

/*
==================================================
Create Placement Record
==================================================
*/

exports.createPlacement = async (
  req,
  res
) => {
  try {

    const {
      student,
      companyName,
      jobRole,
      package,
      location,
      driveDate,
      status,
      joiningDate,
      remarks,
    } = req.body;

    /*
    ==========================================
    Check Student
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
    Duplicate Check
    ==========================================
    */

    const existing =
      await Placement.findOne({
        student,
        companyName,
        jobRole,
        isActive: true,
      });

    if (existing) {

      return res.status(400).json({
        success: false,
        message:
          "Placement record already exists.",
      });

    }

    /*
    ==========================================
    Create Placement
    ==========================================
    */

    const placement =
      await Placement.create({

        student,
        companyName,
        jobRole,
        package,
        location,
        driveDate,
        status,
        joiningDate,
        remarks,

      });

    res.status(201).json({

      success: true,

      message:
        "Placement record created successfully.",

      placement,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to create placement record.",

    });

  }
};

/*
==================================================
Get All Placements
==================================================
*/

exports.getPlacements =
  async (
    req,
    res
  ) => {

    try {

      const {
        page = 1,
        limit = 10,
        companyName,
        status,
      } = req.query;

      const query = {
        isActive: true,
      };

      if (companyName) {

        query.companyName = {
          $regex: companyName,
          $options: "i",
        };

      }

      if (status) {

        query.status = status;

      }

      const total =
        await Placement.countDocuments(
          query
        );

      const placements =
        await Placement.find(query)
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .sort({
            driveDate: -1,
          })
          .skip(
            (Number(page) - 1) *
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

        placements,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch placement records.",

      });

    }

  };

/*
==================================================
Get Placement By ID
==================================================
*/

exports.getPlacementById =
  async (
    req,
    res
  ) => {

    try {

      const placement =
        await Placement.findById(
          req.params.id
        ).populate(
          "student"
        );

      if (!placement) {

        return res.status(404).json({

          success: false,

          message:
            "Placement record not found.",

        });

      }

      res.status(200).json({

        success: true,

        placement,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch placement record.",

      });

    }

  };

/*
==================================================
Search Placements
==================================================
*/

exports.searchPlacements =
  async (
    req,
    res
  ) => {

    try {

      const keyword =
        req.query.search || "";

      const placements =
        await Placement.find({
          isActive: true,
        }).populate({

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

        });

      const filtered =
        placements.filter(
          (item) =>
            item.student
        );

      res.status(200).json({

        success: true,

        total:
          filtered.length,

        placements:
          filtered,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to search placements.",

      });

    }

  };

/*
==================================================
Update Placement
==================================================
*/

exports.updatePlacement = async (
  req,
  res
) => {

  try {

    const placement =
      await Placement.findById(
        req.params.id
      );

    if (!placement) {

      return res.status(404).json({
        success: false,
        message: "Placement record not found.",
      });

    }

    const fields = [
      "companyName",
      "jobRole",
      "package",
      "location",
      "driveDate",
      "status",
      "joiningDate",
      "remarks",
    ];

    fields.forEach((field) => {

      if (
        req.body[field] !== undefined
      ) {

        placement[field] =
          req.body[field];

      }

    });

    await placement.save();

    res.status(200).json({

      success: true,

      message:
        "Placement updated successfully.",

      placement,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to update placement.",

    });

  }

};

/*
==================================================
Delete Placement (Soft Delete)
==================================================
*/

exports.deletePlacement =
  async (
    req,
    res
  ) => {

    try {

      const placement =
        await Placement.findById(
          req.params.id
        );

      if (!placement) {

        return res.status(404).json({

          success: false,

          message:
            "Placement record not found.",

        });

      }

      placement.isActive = false;

      await placement.save();

      res.status(200).json({

        success: true,

        message:
          "Placement deleted successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to delete placement.",

      });

    }

  };

/*
==================================================
Restore Placement
==================================================
*/

exports.restorePlacement =
  async (
    req,
    res
  ) => {

    try {

      const placement =
        await Placement.findById(
          req.params.id
        );

      if (!placement) {

        return res.status(404).json({

          success: false,

          message:
            "Placement record not found.",

        });

      }

      placement.isActive = true;

      await placement.save();

      res.status(200).json({

        success: true,

        message:
          "Placement restored successfully.",

        placement,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to restore placement.",

      });

    }

  };

/*
==================================================
Get Student Placements
==================================================
*/

exports.getStudentPlacements =
  async (
    req,
    res
  ) => {

    try {

      const placements =
        await Placement.find({

          student:
            req.params.studentId,

          isActive: true,

        }).sort({
          driveDate: -1,
        });

      res.status(200).json({

        success: true,

        total:
          placements.length,

        placements,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch student placements.",

      });

    }

  };

/*
==================================================
Get Selected Students
==================================================
*/

exports.getSelectedPlacements =
  async (
    req,
    res
  ) => {

    try {

      const placements =
        await Placement.find({

          status: "Selected",

          isActive: true,

        })
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .sort({
            driveDate: -1,
          });

      res.status(200).json({

        success: true,

        total:
          placements.length,

        placements,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch selected placements.",

      });

    }

  };

/*
==================================================
Get Rejected Students
==================================================
*/

exports.getRejectedPlacements =
  async (
    req,
    res
  ) => {

    try {

      const placements =
        await Placement.find({

          status: "Rejected",

          isActive: true,

        })
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .sort({
            driveDate: -1,
          });

      res.status(200).json({

        success: true,

        total:
          placements.length,

        placements,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch rejected placements.",

      });

    }

  };

/*
==================================================
Get Company Placements
==================================================
*/

exports.getCompanyPlacements =
  async (
    req,
    res
  ) => {

    try {

      const placements =
        await Placement.find({

          companyName: {
            $regex:
              req.params.company,
            $options: "i",
          },

          isActive: true,

        })
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .sort({
            driveDate: -1,
          });

      res.status(200).json({

        success: true,

        total:
          placements.length,

        placements,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch company placements.",

      });

    }

  };

/*
==================================================
Placement Statistics
==================================================
*/

exports.getPlacementStats =
  async (
    req,
    res
  ) => {

    try {

      const totalPlacements =
        await Placement.countDocuments({
          isActive: true,
        });

      const selected =
        await Placement.countDocuments({
          status: "Selected",
          isActive: true,
        });

      const rejected =
        await Placement.countDocuments({
          status: "Rejected",
          isActive: true,
        });

      const shortlisted =
        await Placement.countDocuments({
          status: "Shortlisted",
          isActive: true,
        });

      const interview =
        await Placement.countDocuments({
          status: "Interview",
          isActive: true,
        });

      const packageStats =
        await Placement.aggregate([
          {
            $match: {
              isActive: true,
            },
          },
          {
            $group: {
              _id: null,
              highestPackage: {
                $max: "$package",
              },
              lowestPackage: {
                $min: "$package",
              },
              averagePackage: {
                $avg: "$package",
              },
            },
          },
        ]);

      res.status(200).json({

        success: true,

        totalPlacements,

        selected,

        rejected,

        shortlisted,

        interview,

        highestPackage:
          packageStats[0]
            ?.highestPackage || 0,

        lowestPackage:
          packageStats[0]
            ?.lowestPackage || 0,

        averagePackage:
          packageStats[0]
            ?.averagePackage || 0,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch placement statistics.",

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

      const latestPlacements =
        await Placement.find({
          isActive: true,
        })
          .populate(
            "student",
            "name rollNumber"
          )
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.status(200).json({

        success: true,

        latestPlacements,

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
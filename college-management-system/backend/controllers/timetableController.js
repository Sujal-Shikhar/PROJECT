const Timetable = require("../models/Timetable");
const Subject = require("../models/Subject");
const Faculty = require("../models/Faculty");

/*
==================================================
Create Timetable Entry
==================================================
*/

exports.createTimetable = async (
  req,
  res
) => {

  try {

    const {
      department,
      semester,
      section,
      day,
      startTime,
      endTime,
      subject,
      faculty,
      roomNumber,
    } = req.body;

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
    Duplicate Class Slot
    ==========================================
    */

    const existingClass =
      await Timetable.findOne({

        department,

        semester,

        section,

        day,

        startTime,

        isActive: true,

      });

    if (existingClass) {

      return res.status(400).json({

        success: false,

        message:
          "Class already scheduled for this time slot.",

      });

    }

    /*
    ==========================================
    Faculty Conflict
    ==========================================
    */

    const facultyBusy =
      await Timetable.findOne({

        faculty,

        day,

        startTime,

        isActive: true,

      });

    if (facultyBusy) {

      return res.status(400).json({

        success: false,

        message:
          "Faculty is already assigned during this time.",

      });

    }

    /*
    ==========================================
    Room Conflict
    ==========================================
    */

    const roomBusy =
      await Timetable.findOne({

        roomNumber,

        day,

        startTime,

        isActive: true,

      });

    if (roomBusy) {

      return res.status(400).json({

        success: false,

        message:
          "Room is already occupied during this time.",

      });

    }

    /*
    ==========================================
    Create Entry
    ==========================================
    */

    const timetable =
      await Timetable.create({

        department,

        semester,

        section,

        day,

        startTime,

        endTime,

        subject,

        faculty,

        roomNumber,

      });

    res.status(201).json({

      success: true,

      message:
        "Timetable entry created successfully.",

      timetable,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to create timetable entry.",

    });

  }

};

/*
==================================================
Get All Timetable Entries
==================================================
*/

exports.getTimetable =
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
        day,
      } = req.query;

      const query = {
        isActive: true,
      };

      if (department) {

        query.department =
          department;

      }

      if (semester) {

        query.semester =
          Number(semester);

      }

      if (section) {

        query.section =
          section.toUpperCase();

      }

      if (day) {

        query.day = day;

      }

      const total =
        await Timetable.countDocuments(
          query
        );

      const timetable =
        await Timetable.find(query)
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "faculty",
            "name employeeId"
          )
          .sort({
            day: 1,
            startTime: 1,
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

        timetable,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch timetable.",

      });

    }

  };

/*
==================================================
Get Timetable By ID
==================================================
*/

exports.getTimetableById =
  async (
    req,
    res
  ) => {

    try {

      const timetable =
        await Timetable.findById(
          req.params.id
        )
          .populate(
            "subject"
          )
          .populate(
            "faculty"
          );

      if (!timetable) {

        return res.status(404).json({

          success: false,

          message:
            "Timetable entry not found.",

        });

      }

      res.status(200).json({

        success: true,

        timetable,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch timetable entry.",

      });

    }

  };

/*
==================================================
Search Timetable
==================================================
*/

exports.searchTimetable =
  async (
    req,
    res
  ) => {

    try {

      const keyword =
        req.query.search || "";

      const timetable =
        await Timetable.find({
          isActive: true,
          roomNumber: {
            $regex: keyword,
            $options: "i",
          },
        })
          .populate(
            "subject",
            "name code"
          )
          .populate(
            "faculty",
            "name employeeId"
          );

      res.status(200).json({

        success: true,

        total:
          timetable.length,

        timetable,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to search timetable.",

      });

    }

  };

/*
==================================================
Update Timetable Entry
==================================================
*/

exports.updateTimetable = async (
  req,
  res
) => {

  try {

    const timetable =
      await Timetable.findById(
        req.params.id
      );

    if (!timetable) {

      return res.status(404).json({

        success: false,

        message:
          "Timetable entry not found.",

      });

    }

    const fields = [

      "department",

      "semester",

      "section",

      "day",

      "startTime",

      "endTime",

      "subject",

      "faculty",

      "roomNumber",

    ];

    fields.forEach((field) => {

      if (
        req.body[field] !==
        undefined
      ) {

        timetable[field] =
          req.body[field];

      }

    });

    /*
    ==========================================
    Faculty Conflict Check
    ==========================================
    */

    const facultyBusy =
      await Timetable.findOne({

        _id: {
          $ne: timetable._id,
        },

        faculty:
          timetable.faculty,

        day:
          timetable.day,

        startTime:
          timetable.startTime,

        isActive: true,

      });

    if (facultyBusy) {

      return res.status(400).json({

        success: false,

        message:
          "Faculty is already assigned for this time slot.",

      });

    }

    /*
    ==========================================
    Room Conflict Check
    ==========================================
    */

    const roomBusy =
      await Timetable.findOne({

        _id: {
          $ne: timetable._id,
        },

        roomNumber:
          timetable.roomNumber,

        day:
          timetable.day,

        startTime:
          timetable.startTime,

        isActive: true,

      });

    if (roomBusy) {

      return res.status(400).json({

        success: false,

        message:
          "Room is already occupied for this time slot.",

      });

    }

    await timetable.save();

    res.status(200).json({

      success: true,

      message:
        "Timetable updated successfully.",

      timetable,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to update timetable.",

    });

  }

};

/*
==================================================
Delete Timetable Entry
==================================================
*/

exports.deleteTimetable =
  async (
    req,
    res
  ) => {

    try {

      const timetable =
        await Timetable.findById(
          req.params.id
        );

      if (!timetable) {

        return res.status(404).json({

          success: false,

          message:
            "Timetable entry not found.",

        });

      }

      timetable.isActive =
        false;

      await timetable.save();

      res.status(200).json({

        success: true,

        message:
          "Timetable deleted successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to delete timetable.",

      });

    }

  };

/*
==================================================
Restore Timetable Entry
==================================================
*/

exports.restoreTimetable =
  async (
    req,
    res
  ) => {

    try {

      const timetable =
        await Timetable.findById(
          req.params.id
        );

      if (!timetable) {

        return res.status(404).json({

          success: false,

          message:
            "Timetable entry not found.",

        });

      }

      timetable.isActive =
        true;

      await timetable.save();

      res.status(200).json({

        success: true,

        message:
          "Timetable restored successfully.",

        timetable,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to restore timetable.",

      });

    }

  };

/*
==================================================
Get Faculty Timetable
==================================================
*/

exports.getFacultyTimetable =
  async (
    req,
    res
  ) => {

    try {

      const timetable =
        await Timetable.find({

          faculty:
            req.params.facultyId,

          isActive: true,

        })
          .populate(
            "subject",
            "name code"
          )
          .sort({

            day: 1,

            startTime: 1,

          });

      res.status(200).json({

        success: true,

        total:
          timetable.length,

        timetable,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch faculty timetable.",

      });

    }

  };

/*
==================================================
Get Class Timetable
==================================================
*/

exports.getClassTimetable =
  async (
    req,
    res
  ) => {

    try {

      const timetable =
        await Timetable.find({

          department:
            req.params.department,

          semester:
            Number(
              req.params.semester
            ),

          section:
            req.params.section.toUpperCase(),

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

            day: 1,

            startTime: 1,

          });

      res.status(200).json({

        success: true,

        total:
          timetable.length,

        timetable,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch class timetable.",

      });

    }

  };

/*
==================================================
Get Today's Timetable
==================================================
*/

exports.getTodayTimetable =
  async (
    req,
    res
  ) => {

    try {

      const today =
        new Date().toLocaleDateString(
          "en-US",
          {
            weekday: "long",
          }
        );

      const timetable =
        await Timetable.find({

          day: today,

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

            startTime: 1,

          });

      res.status(200).json({

        success: true,

        total:
          timetable.length,

        timetable,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch today's timetable.",

      });

    }

  };

/*
==================================================
Timetable Statistics
==================================================
*/

exports.getTimetableStats =
  async (
    req,
    res
  ) => {

    try {

      const totalClasses =
        await Timetable.countDocuments({
          isActive: true,
        });

      const departments =
        await Timetable.distinct(
          "department",
          {
            isActive: true,
          }
        );

      const facultyCount =
        await Timetable.distinct(
          "faculty",
          {
            isActive: true,
          }
        );

      const subjectCount =
        await Timetable.distinct(
          "subject",
          {
            isActive: true,
          }
        );

      res.status(200).json({

        success: true,

        totalClasses,

        departments:
          departments.length,

        faculties:
          facultyCount.length,

        subjects:
          subjectCount.length,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch timetable statistics.",

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

      const latestTimetable =
        await Timetable.find({
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
            createdAt: -1,
          })
          .limit(10);

      res.status(200).json({

        success: true,

        latestTimetable,

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
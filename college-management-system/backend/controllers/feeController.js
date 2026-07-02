const Fee = require("../models/Fee");
const Student = require("../models/Student");

/*
==================================================
Create Fee Record
==================================================
*/

exports.createFee = async (
  req,
  res
) => {

  try {

    const {
      student,
      academicYear,
      semester,
      totalFee,
      amountPaid,
      paymentMethod,
      paymentDate,
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

    const existingFee =
      await Fee.findOne({
        student,
        academicYear,
        semester,
      });

    if (existingFee) {

      return res.status(400).json({
        success: false,
        message:
          "Fee record already exists.",
      });

    }

    /*
    ==========================================
    Create Fee
    ==========================================
    */

    const fee =
      await Fee.create({

        student,

        academicYear,

        semester,

        totalFee,

        amountPaid,

        paymentMethod,

        paymentDate,

        remarks,

      });

    res.status(201).json({

      success: true,

      message:
        "Fee record created successfully.",

      fee,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to create fee record.",

    });

  }

};

/*
==================================================
Get All Fees
==================================================
*/

exports.getFees =
  async (
    req,
    res
  ) => {

    try {

      const {
        page = 1,
        limit = 10,
        semester,
        academicYear,
        paymentStatus,
      } = req.query;

      const query = {
        isActive: true,
      };

      if (semester) {

        query.semester =
          Number(semester);

      }

      if (academicYear) {

        query.academicYear =
          academicYear;

      }

      if (paymentStatus) {

        query.paymentStatus =
          paymentStatus;

      }

      const total =
        await Fee.countDocuments(
          query
        );

      const fees =
        await Fee.find(query)
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .sort({
            createdAt: -1,
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
            total /
            Number(limit)
          ),

        fees,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch fee records.",

      });

    }

  };

/*
==================================================
Get Fee By ID
==================================================
*/

exports.getFeeById =
  async (
    req,
    res
  ) => {

    try {

      const fee =
        await Fee.findById(
          req.params.id
        )
          .populate(
            "student"
          );

      if (!fee) {

        return res.status(404).json({

          success: false,

          message:
            "Fee record not found.",

        });

      }

      res.status(200).json({

        success: true,

        fee,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch fee record.",

      });

    }

  };

/*
==================================================
Search Fee Records
==================================================
*/

exports.searchFees =
  async (
    req,
    res
  ) => {

    try {

      const keyword =
        req.query.search || "";

      const fees =
        await Fee.find({
          isActive: true,
        })
          .populate({
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
        fees.filter(
          (
            item
          ) => item.student
        );

      res.status(200).json({

        success: true,

        total:
          filtered.length,

        fees:
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
Update Fee Record
==================================================
*/

exports.updateFee = async (
  req,
  res
) => {

  try {

    const fee =
      await Fee.findById(
        req.params.id
      );

    if (!fee) {

      return res.status(404).json({
        success: false,
        message: "Fee record not found.",
      });

    }

    const fields = [
      "academicYear",
      "semester",
      "totalFee",
      "amountPaid",
      "paymentMethod",
      "paymentDate",
      "remarks",
    ];

    fields.forEach((field) => {

      if (
        req.body[field] !==
        undefined
      ) {

        fee[field] =
          req.body[field];

      }

    });

    await fee.save();

    res.status(200).json({

      success: true,

      message:
        "Fee record updated successfully.",

      fee,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to update fee record.",

    });

  }

};

/*
==================================================
Record Payment
==================================================
*/

exports.recordPayment =
  async (
    req,
    res
  ) => {

    try {

      const {
        amount,
        paymentMethod,
        paymentDate,
      } = req.body;

      const fee =
        await Fee.findById(
          req.params.id
        );

      if (!fee) {

        return res.status(404).json({

          success: false,

          message:
            "Fee record not found.",

        });

      }

      if (
        amount <= 0
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Payment amount must be greater than zero.",

        });

      }

      if (
        fee.amountPaid +
          amount >
        fee.totalFee
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Payment exceeds total fee.",

        });

      }

      fee.amountPaid +=
        Number(amount);

      if (
        paymentMethod
      ) {

        fee.paymentMethod =
          paymentMethod;

      }

      if (
        paymentDate
      ) {

        fee.paymentDate =
          paymentDate;

      }

      await fee.save();

      res.status(200).json({

        success: true,

        message:
          "Payment recorded successfully.",

        fee,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to record payment.",

      });

    }

  };

/*
==================================================
Delete Fee (Soft Delete)
==================================================
*/

exports.deleteFee =
  async (
    req,
    res
  ) => {

    try {

      const fee =
        await Fee.findById(
          req.params.id
        );

      if (!fee) {

        return res.status(404).json({

          success: false,

          message:
            "Fee record not found.",

        });

      }

      fee.isActive =
        false;

      await fee.save();

      res.status(200).json({

        success: true,

        message:
          "Fee record deleted successfully.",

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
Restore Fee
==================================================
*/

exports.restoreFee =
  async (
    req,
    res
  ) => {

    try {

      const fee =
        await Fee.findById(
          req.params.id
        );

      if (!fee) {

        return res.status(404).json({

          success: false,

          message:
            "Fee record not found.",

        });

      }

      fee.isActive =
        true;

      await fee.save();

      res.status(200).json({

        success: true,

        message:
          "Fee record restored successfully.",

        fee,

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
Get Student Fee History
==================================================
*/

exports.getStudentFees =
  async (
    req,
    res
  ) => {

    try {

      const fees =
        await Fee.find({

          student:
            req.params.studentId,

          isActive: true,

        })
          .sort({
            semester: 1,
          });

      res.status(200).json({

        success: true,

        total:
          fees.length,

        fees,

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
Get Pending Fees
==================================================
*/

exports.getPendingFees =
  async (
    req,
    res
  ) => {

    try {

      const fees =
        await Fee.find({

          paymentStatus:
            "Pending",

          isActive: true,

        }).populate(
          "student",
          "name rollNumber department semester"
        );

      res.status(200).json({

        success: true,

        total:
          fees.length,

        fees,

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
Get Paid Fees
==================================================
*/

exports.getPaidFees =
  async (
    req,
    res
  ) => {

    try {

      const fees =
        await Fee.find({

          paymentStatus:
            "Paid",

          isActive: true,

        })
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          fees.length,

        fees,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch paid fee records.",

      });

    }

  };

/*
==================================================
Get Partial Payment Fees
==================================================
*/

exports.getPartialFees =
  async (
    req,
    res
  ) => {

    try {

      const fees =
        await Fee.find({

          paymentStatus:
            "Partial",

          isActive: true,

        })
          .populate(
            "student",
            "name rollNumber department semester"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          fees.length,

        fees,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch partial payment records.",

      });

    }

  };

/*
==================================================
Fee Statistics
==================================================
*/

exports.getFeeStats =
  async (
    req,
    res
  ) => {

    try {

      const totalRecords =
        await Fee.countDocuments({
          isActive: true,
        });

      const pendingFees =
        await Fee.countDocuments({
          paymentStatus:
            "Pending",
          isActive: true,
        });

      const partialFees =
        await Fee.countDocuments({
          paymentStatus:
            "Partial",
          isActive: true,
        });

      const paidFees =
        await Fee.countDocuments({
          paymentStatus:
            "Paid",
          isActive: true,
        });

      const collection =
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
                $sum:
                  "$totalFee",
              },
              totalCollected: {
                $sum:
                  "$amountPaid",
              },
              totalPending: {
                $sum:
                  "$balance",
              },
            },
          },
        ]);

      res.status(200).json({

        success: true,

        totalRecords,

        pendingFees,

        partialFees,

        paidFees,

        totalFee:
          collection[0]
            ?.totalFee || 0,

        totalCollected:
          collection[0]
            ?.totalCollected || 0,

        totalPending:
          collection[0]
            ?.totalPending || 0,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch fee statistics.",

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

      const latestFees =
        await Fee.find({
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

        latestFees,

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
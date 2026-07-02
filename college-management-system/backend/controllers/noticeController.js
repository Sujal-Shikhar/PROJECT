const Notice = require("../models/Notice");
const Faculty = require("../models/Faculty");

/*
==================================================
Create Notice
==================================================
*/

exports.createNotice = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      audience,
      department,
      semester,
      publishedBy,
      publishDate,
      expiryDate,
    } = req.body;

    /*
    ==========================================
    Validate Publisher
    ==========================================
    */

    const faculty =
      await Faculty.findById(
        publishedBy
      );

    if (!faculty) {

      return res.status(404).json({

        success: false,

        message:
          "Publisher not found.",

      });

    }

    /*
    ==========================================
    Create Notice
    ==========================================
    */

    const notice =
      await Notice.create({

        title,

        description,

        audience,

        department,

        semester,

        publishedBy,

        publishDate,

        expiryDate,

      });

    res.status(201).json({

      success: true,

      message:
        "Notice created successfully.",

      notice,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to create notice.",

    });

  }

};

/*
==================================================
Get All Notices
==================================================
*/

exports.getNotices =
  async (
    req,
    res
  ) => {

    try {

      const {

        page = 1,

        limit = 10,

        audience,

        department,

        semester,

      } = req.query;

      const query = {

        isActive: true,

        isPublished: true,

      };

      if (audience) {

        query.audience =
          audience;

      }

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

      const total =
        await Notice.countDocuments(
          query
        );

      const notices =
        await Notice.find(query)
          .populate(
            "publishedBy",
            "name employeeId"
          )
          .sort({
            publishDate: -1,
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

        notices,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch notices.",

      });

    }

  };

/*
==================================================
Get Notice By ID
==================================================
*/

exports.getNoticeById =
  async (
    req,
    res
  ) => {

    try {

      const notice =
        await Notice.findById(
          req.params.id
        )
          .populate(
            "publishedBy",
            "name employeeId"
          );

      if (!notice) {

        return res.status(404).json({

          success: false,

          message:
            "Notice not found.",

        });

      }

      res.status(200).json({

        success: true,

        notice,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch notice.",

      });

    }

  };

/*
==================================================
Search Notices
==================================================
*/

exports.searchNotices =
  async (
    req,
    res
  ) => {

    try {

      const keyword =
        req.query.search || "";

      const notices =
        await Notice.find({

          isActive: true,

          isPublished: true,

          $or: [

            {
              title: {
                $regex: keyword,
                $options: "i",
              },
            },

            {
              description: {
                $regex: keyword,
                $options: "i",
              },
            },

          ],

        })
          .populate(
            "publishedBy",
            "name"
          )
          .sort({
            publishDate: -1,
          });

      res.status(200).json({

        success: true,

        total:
          notices.length,

        notices,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to search notices.",

      });

    }

  };

/*
==================================================
Update Notice
==================================================
*/

exports.updateNotice = async (
  req,
  res
) => {

  try {

    const notice =
      await Notice.findById(
        req.params.id
      );

    if (!notice) {

      return res.status(404).json({

        success: false,

        message:
          "Notice not found.",

      });

    }

    const fields = [

      "title",

      "description",

      "audience",

      "department",

      "semester",

      "publishDate",

      "expiryDate",

    ];

    fields.forEach((field) => {

      if (
        req.body[field] !== undefined
      ) {

        notice[field] =
          req.body[field];

      }

    });

    await notice.save();

    res.status(200).json({

      success: true,

      message:
        "Notice updated successfully.",

      notice,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to update notice.",

    });

  }

};

/*
==================================================
Delete Notice (Soft Delete)
==================================================
*/

exports.deleteNotice =
  async (
    req,
    res
  ) => {

    try {

      const notice =
        await Notice.findById(
          req.params.id
        );

      if (!notice) {

        return res.status(404).json({

          success: false,

          message:
            "Notice not found.",

        });

      }

      notice.isActive =
        false;

      await notice.save();

      res.status(200).json({

        success: true,

        message:
          "Notice deleted successfully.",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to delete notice.",

      });

    }

  };

/*
==================================================
Restore Notice
==================================================
*/

exports.restoreNotice =
  async (
    req,
    res
  ) => {

    try {

      const notice =
        await Notice.findById(
          req.params.id
        );

      if (!notice) {

        return res.status(404).json({

          success: false,

          message:
            "Notice not found.",

        });

      }

      notice.isActive =
        true;

      await notice.save();

      res.status(200).json({

        success: true,

        message:
          "Notice restored successfully.",

        notice,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to restore notice.",

      });

    }

  };

/*
==================================================
Publish Notice
==================================================
*/

exports.publishNotice =
  async (
    req,
    res
  ) => {

    try {

      const notice =
        await Notice.findById(
          req.params.id
        );

      if (!notice) {

        return res.status(404).json({

          success: false,

          message:
            "Notice not found.",

        });

      }

      notice.isPublished =
        true;

      await notice.save();

      res.status(200).json({

        success: true,

        message:
          "Notice published successfully.",

        notice,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to publish notice.",

      });

    }

  };

/*
==================================================
Unpublish Notice
==================================================
*/

exports.unpublishNotice =
  async (
    req,
    res
  ) => {

    try {

      const notice =
        await Notice.findById(
          req.params.id
        );

      if (!notice) {

        return res.status(404).json({

          success: false,

          message:
            "Notice not found.",

        });

      }

      notice.isPublished =
        false;

      await notice.save();

      res.status(200).json({

        success: true,

        message:
          "Notice unpublished successfully.",

        notice,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to unpublish notice.",

      });

    }

  };

/*
==================================================
Get Active Notices
==================================================
*/

exports.getActiveNotices =
  async (
    req,
    res
  ) => {

    try {

      const notices =
        await Notice.find({

          isActive: true,

          isPublished: true,

        })
          .populate(
            "publishedBy",
            "name employeeId"
          )
          .sort({
            publishDate: -1,
          });

      res.status(200).json({

        success: true,

        total:
          notices.length,

        notices,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch active notices.",

      });

    }

  };

/*
==================================================
Get Expired Notices
==================================================
*/

exports.getExpiredNotices =
  async (
    req,
    res
  ) => {

    try {

      const notices =
        await Notice.find({

          expiryDate: {
            $lt: new Date(),
          },

          isActive: true,

        })
          .populate(
            "publishedBy",
            "name employeeId"
          )
          .sort({
            expiryDate: -1,
          });

      res.status(200).json({

        success: true,

        total:
          notices.length,

        notices,

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch expired notices.",

      });

    }

  };

/*
==================================================
Notice Statistics
==================================================
*/

exports.getNoticeStats = async (
  req,
  res
) => {

  try {

    const totalNotices =
      await Notice.countDocuments({
        isActive: true,
      });

    const published =
      await Notice.countDocuments({
        isActive: true,
        isPublished: true,
      });

    const unpublished =
      await Notice.countDocuments({
        isActive: true,
        isPublished: false,
      });

    const expired =
      await Notice.countDocuments({
        isActive: true,
        expiryDate: {
          $lt: new Date(),
        },
      });

    const active =
      await Notice.countDocuments({
        isActive: true,
        isPublished: true,
        $or: [
          {
            expiryDate: {
              $exists: false,
            },
          },
          {
            expiryDate: null,
          },
          {
            expiryDate: {
              $gte: new Date(),
            },
          },
        ],
      });

    res.status(200).json({

      success: true,

      totalNotices,

      published,

      unpublished,

      active,

      expired,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Unable to fetch notice statistics.",

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

    const latestNotices =
      await Notice.find({
        isActive: true,
        isPublished: true,
      })
        .populate(
          "publishedBy",
          "name"
        )
        .sort({
          publishDate: -1,
        })
        .limit(10);

    res.status(200).json({

      success: true,

      latestNotices,

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
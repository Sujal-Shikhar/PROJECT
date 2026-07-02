const express = require("express");

const router = express.Router();

const {

  createNotice,
  getNotices,
  getNoticeById,
  searchNotices,

  updateNotice,
  deleteNotice,
  restoreNotice,

  publishNotice,
  unpublishNotice,

  getActiveNotices,
  getExpiredNotices,

  getNoticeStats,
  dashboardSummary,

} = require("../controllers/noticeController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const noticeValidator = require(
  "../validators/noticeValidator"
);

const validate = require(
  "../middleware/validateMiddleware"
);

router.use(protect);

/*
==========================================
Dashboard
==========================================
*/

router.get(
  "/dashboard",
  authorize("admin"),
  dashboardSummary
);

router.get(
  "/stats",
  authorize("admin"),
  getNoticeStats
);

/*
==========================================
Search
==========================================
*/

router.get(
  "/search",
  searchNotices
);

/*
==========================================
Special
==========================================
*/

router.get(
  "/active",
  getActiveNotices
);

router.get(
  "/expired",
  authorize("admin"),
  getExpiredNotices
);

/*
==========================================
Publish
==========================================
*/

router.put(
  "/publish/:id",
  authorize("admin"),
  publishNotice
);

router.put(
  "/unpublish/:id",
  authorize("admin"),
  unpublishNotice
);

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreNotice
);

/*
==========================================
CRUD
==========================================
*/

router.get(
  "/",
  getNotices
);

router.get(
  "/:id",
  getNoticeById
);

router.post(
  "/",
  authorize(
    "admin",
    "faculty"
  ),
  noticeValidator,
  validate,
  createNotice
);

router.put(
  "/:id",
  authorize(
    "admin",
    "faculty"
  ),
  noticeValidator,
  validate,
  updateNotice
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteNotice
);

module.exports = router;
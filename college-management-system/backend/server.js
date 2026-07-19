const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

// Database
const connectDB = require("./config/db");

// Middlewares
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const attendanceReportRoutes = require("./routes/attendanceReportRoutes");
const examRoutes = require("./routes/examRoutes");
const feeRoutes = require("./routes/feeRoutes");
const placementRoutes = require("./routes/placementRoutes");
const resultRoutes = require("./routes/resultRoutes");
const resultPdfRoutes = require("./routes/resultPdfRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const facultySubjectRoutes = require("./routes/facultySubjectRoutes");
const internalMarkRoutes = require("./routes/internalMarkRoutes");
const noticeRoutes = require("./routes/noticeRoutes");

// Load Environment Variables


// Connect Database
connectDB();

const app = express();
app.set("trust proxy", 1);
/*
==================================================
SECURITY
==================================================
*/

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

/*
==================================================
RATE LIMIT
==================================================
*/

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use("/api", limiter);

/*
==================================================
BODY PARSER
==================================================
*/

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20mb",
  })
);

app.use(cookieParser());

/*
==================================================
CORS
==================================================
*/

app.use(
  cors({
    origin: process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",")
      : ["http://localhost:5173"],

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/*
==================================================
LOGGING
==================================================
*/

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/*
==================================================
HEALTH CHECK
==================================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "College Management System API Running 🚀",
    environment:
      process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

/*
==================================================
API ROUTES
==================================================
*/

app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/faculty", facultyRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use(
  "/api/attendance-report",
  attendanceReportRoutes
);

app.use("/api/exams", examRoutes);

app.use("/api/fees", feeRoutes);

app.use(
  "/api/placements",
  placementRoutes
);

app.use("/api/results", resultRoutes);

app.use(
  "/api/results/pdf",
  resultPdfRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use("/api/subjects", subjectRoutes);

app.use(
  "/api/timetable",
  timetableRoutes
);

app.use(
  "/api/faculty-subjects",
  facultySubjectRoutes
);

app.use(
  "/api/internal-marks",
  internalMarkRoutes
);

app.use("/api/notices", noticeRoutes);

/*
==================================================
404
==================================================
*/

app.use(notFound);

/*
==================================================
ERROR HANDLER
==================================================
*/

app.use(errorHandler);

/*
==================================================
START SERVER
==================================================
*/

const PORT = process.env.PORT || 2001;

const server = app.listen(PORT, () => {
  console.log(`
==========================================
🚀 College Management System API Started
==========================================
Environment : ${process.env.NODE_ENV || "development"}
Port        : ${PORT}
==========================================
`);
});

/*
==================================================
UNHANDLED REJECTION
==================================================
*/

process.on("unhandledRejection", (err) => {
  console.error(
    "Unhandled Rejection:",
    err.message
  );

  server.close(() => process.exit(1));
});

/*
==================================================
UNCAUGHT EXCEPTION
==================================================
*/

process.on("uncaughtException", (err) => {
  console.error(
    "Uncaught Exception:",
    err.message
  );

  process.exit(1);
});

/*
==================================================
SIGTERM
==================================================
*/

process.on("SIGTERM", () => {
  console.log("SIGTERM received.");

  server.close(() => {
    console.log("Server Closed.");
  });
});
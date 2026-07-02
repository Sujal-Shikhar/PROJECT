const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(morgan("dev"));

/*
Routes
*/

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/subject", require("./routes/subjectRoutes"));
app.use("/api/exam", require("./routes/examRoutes"));
app.use("/api/fee", require("./routes/feeRoutes"));
app.use("/api/placement", require("./routes/placementRoutes"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "College Management API Running"
    });
});

app.use(errorMiddleware);

module.exports = app;
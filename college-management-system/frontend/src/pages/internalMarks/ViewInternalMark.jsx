import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getInternalMarkById,
} from "../../api/internalMarkApi";

const ViewInternalMark = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [record, setRecord] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    try {
      const res =
        await getInternalMarkById(id);

      setRecord(res.internalMark);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load record."
      );

      navigate("/internal-marks");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        Loading...
      </div>
    );
  }

  if (!record) return null;

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Internal Mark Details
          </h1>

          <p className="text-gray-500 mt-2">
            Complete assessment record.
          </p>

        </div>

        <Link
          to={`/internal-marks/edit/${record._id}`}
          className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Edit
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <Info
            label="Student"
            value={record.student?.name}
          />

          <Info
            label="Roll Number"
            value={
              record.student?.rollNumber
            }
          />

          <Info
            label="Subject"
            value={record.subject?.name}
          />

          <Info
            label="Subject Code"
            value={record.subject?.code}
          />

          <Info
            label="Faculty"
            value={record.faculty?.name}
          />

          <Info
            label="Exam"
            value={
              record.exam?.examType ||
              record.exam?.name
            }
          />

          <Info
            label="Assignment"
            value={record.assignmentMarks}
          />

          <Info
            label="Quiz"
            value={record.quizMarks}
          />

          <Info
            label="Attendance"
            value={
              record.attendanceMarks
            }
          />

          <Info
            label="Practical"
            value={
              record.practicalMarks
            }
          />

          <Info
            label="Viva"
            value={record.vivaMarks}
          />

          <Info
            label="Internal Exam"
            value={
              record.internalExamMarks
            }
          />

          <Info
            label="Total Marks"
            value={
              record.totalInternalMarks
            }
          />

          <Info
            label="Published"
            value={
              record.isPublished
                ? "Yes"
                : "No"
            }
          />

          <Info
            label="Locked"
            value={
              record.isLocked
                ? "Yes"
                : "No"
            }
          />

        </div>

        <div className="mt-8">

          <h3 className="font-semibold mb-2">
            Remarks
          </h3>

          <div className="border rounded-lg p-4">
            {record.remarks || "-"}
          </div>

        </div>

      </div>

      <Link
        to="/internal-marks"
        className="inline-block px-5 py-2 bg-gray-700 text-white rounded-lg"
      >
        Back
      </Link>

    </div>
  );
};

const Info = ({
  label,
  value,
}) => (
  <div>
    <p className="text-sm text-gray-500">
      {label}
    </p>

    <p className="font-semibold">
      {value ?? "-"}
    </p>
  </div>
);

export default ViewInternalMark;
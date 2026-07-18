import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getResultById,
  downloadStudentResultPDF,
} from "../../api/resultApi";

const ViewResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      setLoading(true);

      const res = await getResultById(id);

      setResult(res.result);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load result");
      navigate("/results");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
  try {
    const blob = await downloadStudentResultPDF(
      result.student._id
    );

    if (!(blob instanceof Blob)) {
      toast.error("Invalid PDF received from server.");
      console.error("Expected Blob but received:", blob);
      return;
    }

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${result.student.rollNumber}_Result.pdf`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    toast.error("Unable to download PDF");
  }
};

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-8">

      <div className="flex justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Result Details
          </h1>

          <p className="text-gray-500 mt-2">
            Examination Result
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={handleDownload}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Download PDF
          </button>

          <Link
            to={`/results/edit/${result._id}`}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
          >
            Edit
          </Link>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <Info
            label="Student"
            value={result.student?.name}
          />

          <Info
            label="Roll Number"
            value={result.student?.rollNumber}
          />

          <Info
            label="Subject"
            value={result.subject?.name}
          />

          <Info
            label="Subject Code"
            value={result.subject?.code}
          />

          <Info
            label="Exam"
            value={result.exam?.name}
          />

          <Info
            label="Exam Type"
            value={result.exam?.examType}
          />

          <Info
            label="Internal Marks"
            value={result.internalMarks}
          />

          <Info
            label="External Marks"
            value={result.externalMarks}
          />

          <Info
            label="Total Marks"
            value={result.totalMarks}
          />

          <Info
            label="Percentage"
            value={`${result.percentage}%`}
          />

          <Info
            label="Grade"
            value={result.grade}
          />

          <Info
            label="Grade Point"
            value={result.gradePoint}
          />

          <Info
            label="Result"
            value={result.result}
          />

          <Info
            label="Published"
            value={
              result.isPublished
                ? "Yes"
                : "No"
            }
          />

          <Info
            label="Locked"
            value={
              result.isLocked
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
            {result.remarks || "-"}
          </div>

        </div>

      </div>

      <Link
        to="/results"
        className="inline-block bg-gray-700 text-white px-5 py-2 rounded-lg"
      >
        Back
      </Link>

    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <label className="text-gray-500">
      {label}
    </label>

    <p className="font-semibold">
      {value}
    </p>
  </div>
);

export default ViewResult;
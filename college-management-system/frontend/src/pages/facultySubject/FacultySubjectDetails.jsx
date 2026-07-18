import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getAssignmentById } from "../../api/facultySubjectApi";

const FacultySubjectDetails = () => {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const res = await getAssignmentById(id);
      setAssignment(res.assignment);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load assignment.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="text-center py-10 text-red-500">
        Assignment not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Faculty Subject Details
          </h1>

          <p className="text-gray-500">
            View assignment information.
          </p>
        </div>

        <Link
          to={`/faculty-subjects/edit/${assignment._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit
        </Link>

      </div>

      <div className="bg-white shadow rounded-xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500">
              Faculty
            </p>

            <p className="font-semibold">
              {assignment.faculty?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Employee ID
            </p>

            <p className="font-semibold">
              {assignment.faculty?.employeeId}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Subject
            </p>

            <p className="font-semibold">
              {assignment.subject?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Subject Code
            </p>

            <p className="font-semibold">
              {assignment.subject?.code}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Department
            </p>

            <p className="font-semibold">
              {assignment.department}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Semester
            </p>

            <p className="font-semibold">
              {assignment.semester}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Section
            </p>

            <p className="font-semibold">
              {assignment.section}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Academic Year
            </p>

            <p className="font-semibold">
              {assignment.academicYear}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Coordinator
            </p>

            <p className="font-semibold">
              {assignment.isCoordinator
                ? "Yes"
                : "No"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Assigned Date
            </p>

            <p className="font-semibold">
              {assignment.assignedDate
                ? new Date(
                    assignment.assignedDate
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>

        </div>

        <div className="mt-6">

          <p className="text-gray-500 mb-2">
            Remarks
          </p>

          <div className="border rounded-lg p-4 bg-gray-50">
            {assignment.remarks || "No remarks"}
          </div>

        </div>

      </div>

    </div>
  );
};

export default FacultySubjectDetails;
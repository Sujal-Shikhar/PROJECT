import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAssignments,
  deleteAssignment,
} from "../../api/facultySubjectApi";

const FacultySubjectList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const res = await getAssignments();

      setAssignments(res.assignments || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this assignment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAssignment(id);

      toast.success("Assignment deleted.");

      fetchAssignments();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete assignment."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Faculty Subject Assignments
          </h1>

          <p className="text-gray-500">
            Manage faculty subject allocations.
          </p>
        </div>

        <Link
          to="/faculty-subjects/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Assignment
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Faculty
              </th>

              <th className="p-3 text-left">
                Subject
              </th>

              <th className="p-3 text-left">
                Department
              </th>

              <th className="p-3 text-left">
                Semester
              </th>

              <th className="p-3 text-left">
                Section
              </th>

              <th className="p-3 text-left">
                Academic Year
              </th>

              <th className="p-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {assignments.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6"
                >
                  No assignments found.
                </td>
              </tr>
            ) : (
              assignments.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                >
                  <td className="p-3">
                    {item.faculty?.name}
                  </td>

                  <td className="p-3">
                    {item.subject?.name}
                  </td>

                  <td className="p-3">
                    {item.department}
                  </td>

                  <td className="p-3">
                    {item.semester}
                  </td>

                  <td className="p-3">
                    {item.section}
                  </td>

                  <td className="p-3">
                    {item.academicYear}
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <Link
                      to={`/faculty-subjects/edit/${item._id}`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default FacultySubjectList;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getFacultyAssignments } from "../../api/facultySubjectApi";

const FacultyAssignments = () => {
  const { facultyId } = useParams();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, [facultyId]);

  const fetchAssignments = async () => {
    try {
      const res = await getFacultyAssignments(facultyId);
      setAssignments(res.assignments || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load assignments.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Faculty Assignments
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Credits</th>
              <th className="p-3 text-left">Semester</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">
                  {item.subject?.name}
                </td>

                <td className="p-3">
                  {item.subject?.code}
                </td>

                <td className="p-3">
                  {item.subject?.credits}
                </td>

                <td className="p-3">
                  {item.semester}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyAssignments;
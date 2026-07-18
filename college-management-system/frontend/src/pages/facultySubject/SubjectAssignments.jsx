import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getSubjectAssignments } from "../../api/facultySubjectApi";

const SubjectAssignments = () => {
  const { subjectId } = useParams();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, [subjectId]);

  const fetchAssignments = async () => {
    try {
      const res = await getSubjectAssignments(subjectId);
      setAssignments(res.assignments || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load assignments.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Subject Assignments
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Faculty</th>
              <th className="p-3">Employee ID</th>
              <th className="p-3">Department</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">
                  {item.faculty?.name}
                </td>

                <td className="p-3">
                  {item.faculty?.employeeId}
                </td>

                <td className="p-3">
                  {item.faculty?.department}
                </td>

                <td className="p-3">
                  {item.faculty?.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectAssignments;
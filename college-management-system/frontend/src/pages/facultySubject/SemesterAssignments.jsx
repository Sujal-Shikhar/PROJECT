import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getSemesterAssignments } from "../../api/facultySubjectApi";

const SemesterAssignments = () => {
  const { semester } = useParams();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, [semester]);

  const fetchAssignments = async () => {
    try {
      const res = await getSemesterAssignments(semester);
      setAssignments(res.assignments || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load assignments.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Semester Assignments
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Faculty</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Code</th>
              <th className="p-3">Department</th>
              <th className="p-3">Section</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((item) => (
              <tr
                key={item._id}
                className="border-t"
              >
                <td className="p-3">{item.faculty?.name}</td>
                <td className="p-3">{item.subject?.name}</td>
                <td className="p-3">{item.subject?.code}</td>
                <td className="p-3">{item.department}</td>
                <td className="p-3">{item.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SemesterAssignments;
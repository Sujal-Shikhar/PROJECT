import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getDepartmentAssignments } from "../../api/facultySubjectApi";

const DepartmentAssignments = () => {
  const { department } = useParams();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, [department]);

  const fetchAssignments = async () => {
    try {
      const res =
        await getDepartmentAssignments(
          department
        );

      setAssignments(res.assignments || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load assignments.");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Department Assignments
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                Faculty
              </th>

              <th className="p-3">
                Subject
              </th>

              <th className="p-3">
                Code
              </th>

              <th className="p-3">
                Semester
              </th>

              <th className="p-3">
                Section
              </th>

            </tr>

          </thead>

          <tbody>

            {assignments.map((item) => (

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
                  {item.subject?.code}
                </td>

                <td className="p-3">
                  {item.semester}
                </td>

                <td className="p-3">
                  {item.section}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DepartmentAssignments;
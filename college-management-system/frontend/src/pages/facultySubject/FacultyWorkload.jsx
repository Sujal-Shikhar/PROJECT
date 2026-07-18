import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getFacultyWorkload } from "../../api/facultySubjectApi";

const FacultyWorkload = () => {

  const [workload, setWorkload] = useState([]);

  useEffect(() => {
    fetchWorkload();
  }, []);

  const fetchWorkload = async () => {
    try {

      const res =
        await getFacultyWorkload();

      setWorkload(res.workload || []);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load workload."
      );

    }
  };

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Faculty Workload
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                Faculty
              </th>

              <th className="p-3">
                Employee ID
              </th>

              <th className="p-3">
                Department
              </th>

              <th className="p-3">
                Subjects Assigned
              </th>

            </tr>

          </thead>

          <tbody>

            {workload.map((item) => (

              <tr
                key={item._id?._id}
                className="border-t"
              >

                <td className="p-3">
                  {item._id?.name}
                </td>

                <td className="p-3">
                  {item._id?.employeeId}
                </td>

                <td className="p-3">
                  {item._id?.department}
                </td>

                <td className="p-3 font-semibold">
                  {item.totalSubjects}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default FacultyWorkload;
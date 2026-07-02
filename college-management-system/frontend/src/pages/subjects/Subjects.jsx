import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import SubjectForm from "./SubjectForm";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    const res = await API.get("/subjects");
    setSubjects(res.data.subjects);
  };

  const deleteSubject = async (id) => {
    await API.delete(`/subjects/${id}`);
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-5">
          Subject Management
        </h1>

        <SubjectForm
          refreshSubjects={fetchSubjects}
        />

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Semester</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Credits</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id}>
                <td className="border p-2">
                  {subject.subjectCode}
                </td>

                <td className="border p-2">
                  {subject.subjectName}
                </td>

                <td className="border p-2">
                  {subject.semester}
                </td>

                <td className="border p-2">
                  {subject.department}
                </td>

                <td className="border p-2">
                  {subject.credits}
                </td>

                <td className="border p-2">
                  <button
                    onClick={() =>
                      deleteSubject(subject._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </Layout>
  );
};

export default Subjects;
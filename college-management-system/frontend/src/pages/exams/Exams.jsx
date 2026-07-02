import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import ExamForm from "./ExamForm";

const Exam = () => {
  const [exams, setExams] = useState([]);

  const fetchExams = async () => {
    try {
      const res = await API.get("/exams");

      setExams(res.data.exams || []);
    } catch (err) {
      console.log(err);
      setExams([]);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const deleteExam = async (id) => {
    try {
      await API.delete(`/exams/${id}`);

      fetchExams();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Exam Management
        </h1>

        <ExamForm
          refreshExams={fetchExams}
        />

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">
                  Subject
                </th>

                <th className="p-3 text-left">
                  Type
                </th>

                <th className="p-3 text-left">
                  Date
                </th>

                <th className="p-3 text-left">
                  Total Marks
                </th>

                <th className="p-3 text-left">
                  Pass Marks
                </th>

                <th className="p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <tr
                    key={exam._id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {exam.subject}
                    </td>

                    <td className="p-3">
                      {exam.examType}
                    </td>

                    <td className="p-3">
                      {new Date(
                        exam.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {exam.totalMarks}
                    </td>

                    <td className="p-3">
                      {exam.passMarks}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          deleteExam(
                            exam._id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-4"
                  >
                    No exams found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Exam;
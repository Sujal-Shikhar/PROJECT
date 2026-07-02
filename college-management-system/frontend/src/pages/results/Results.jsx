import { useEffect, useState } from "react";
import API from "../../api/axios";

import Layout from "../../components/layout/Layout";
import ResultForm from "./ResultForm";
import EditResultForm from "./EditResultForm";

const Results = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] =
    useState(null);

  const fetchResults = async () => {
    try {
      const res = await API.get("/results");

      setResults(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const deleteResult = async (id) => {
    try {
      await API.delete(`/results/${id}`);

      fetchResults();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="p-6">

        <div className="flex justify-between mb-6">

          <h1 className="text-3xl font-bold">
            Results Management
          </h1>

          <a
            href="http://localhost:2001/api/results/pdf/download"
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </a>

        </div>

        <ResultForm refreshResults={fetchResults} />

        {selectedResult && (
          <EditResultForm
            result={selectedResult}
            refreshResults={fetchResults}
            closeModal={() =>
              setSelectedResult(null)
            }
          />
        )}

        <div className="bg-white shadow rounded overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Semester</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Marks</th>
                <th className="p-3">%</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Actions</th>
              </tr>

            </thead>

            <tbody>

              {results.map((result) => (
                <tr
                  key={result._id}
                  className="border-t"
                >
                  <td className="p-3">
                    {result.student?.name}
                  </td>

                  <td className="p-3">
                    {result.semester}
                  </td>

                  <td className="p-3">
                    {result.subject}
                  </td>

                  <td className="p-3">
                    {result.marks}/
                    {result.maxMarks}
                  </td>

                  <td className="p-3">
                    {result.percentage?.toFixed(
                      2
                    )}
                    %
                  </td>

                  <td className="p-3">
                    {result.grade}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        setSelectedResult(
                          result
                        )
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteResult(
                          result._id
                        )
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

      </div>
    </Layout>
  );
};

export default Results;
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import TimetableForm from "./TimetableForm";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTimetables = async () => {
    try {
      setLoading(true);

      const res = await API.get("/timetable");

      setTimetables(
        res.data.timetables ||
        res.data.data ||
        []
      );
    } catch (error) {
      console.log(error);
      setTimetables([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const deleteTimetable = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Delete this timetable record?"
      );

      if (!confirmDelete) return;

      await API.delete(`/timetable/${id}`);

      fetchTimetables();

      alert("Timetable Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <Layout>
      <div className="p-6">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-6">
          Timetable Management
        </h1>

        {/* DASHBOARD CARDS */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">
              Total Lectures
            </h3>

            <p className="text-3xl font-bold">
              {timetables.length}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">
              Subjects
            </h3>

            <p className="text-3xl font-bold">
              {
                new Set(
                  timetables.map(
                    (t) =>
                      t.subject?._id
                  )
                ).size
              }
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">
              Faculty
            </h3>

            <p className="text-3xl font-bold">
              {
                new Set(
                  timetables.map(
                    (t) =>
                      t.faculty?._id
                  )
                ).size
              }
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">
              Classrooms
            </h3>

            <p className="text-3xl font-bold">
              {
                new Set(
                  timetables.map(
                    (t) =>
                      t.classroom
                  )
                ).size
              }
            </p>
          </div>

        </div>

        {/* FORM */}
        <TimetableForm
          refreshTimetable={
            fetchTimetables
          }
        />

        {/* TABLE */}
        <div className="bg-white rounded shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 text-left">
                  Subject
                </th>

                <th className="p-3 text-left">
                  Faculty
                </th>

                <th className="p-3 text-left">
                  Semester
                </th>

                <th className="p-3 text-left">
                  Day
                </th>

                <th className="p-3 text-left">
                  Timing
                </th>

                <th className="p-3 text-left">
                  Room
                </th>

                <th className="p-3 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-6"
                  >
                    Loading...
                  </td>
                </tr>
              ) : timetables.length > 0 ? (

                timetables.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {item.subject
                        ?.subjectName ||
                        "N/A"}
                    </td>

                    <td className="p-3">
                      {item.faculty
                        ?.name || "N/A"}
                    </td>

                    <td className="p-3">
                      {item.semester}
                    </td>

                    <td className="p-3">
                      {item.day}
                    </td>

                    <td className="p-3">
                      {item.startTime} -{" "}
                      {item.endTime}
                    </td>

                    <td className="p-3">
                      {item.classroom}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteTimetable(
                            item._id
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
                    colSpan="7"
                    className="text-center p-6"
                  >
                    No Timetable Records Found
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

export default Timetable;
import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

const InternalMarks = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [stats, setStats] = useState({});

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [semesterFilter,
    setSemesterFilter] =
    useState("");

  const [form,
    setForm] = useState({
      student: "",
      subject: "",
      assignmentMarks: "",
      attendanceMarks: "",
      testMarks: "",
    });

  /*
  ===========================
  FETCH DATA
  ===========================
  */

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        studentRes,
        subjectRes,
        markRes,
        statRes,
      ] = await Promise.all([
        API.get("/students"),
        API.get("/subjects"),
        API.get("/internal-marks"),
        API.get("/internal-marks/stats"),
      ]);

      setStudents(
        studentRes.data.students || []
      );

      setSubjects(
        subjectRes.data.subjects || []
      );

      setMarks(
        markRes.data.marks || []
      );

      setStats(statRes.data);
    } catch (error) {
      console.log(error);
      alert(
        "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /*
  ===========================
  ADD MARK
  ===========================
  */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !form.student ||
        !form.subject
      ) {
        return alert(
          "Student and Subject are required"
        );
      }

      try {
        await API.post(
          "/internal-marks",
          form
        );

        setForm({
          student: "",
          subject: "",
          assignmentMarks: "",
          attendanceMarks: "",
          testMarks: "",
        });

        fetchData();

        alert(
          "Marks Added Successfully"
        );
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed"
        );
      }
    };

  /*
  ===========================
  DELETE MARK
  ===========================
  */

  const deleteMark =
    async (id) => {
      const ok =
        window.confirm(
          "Delete this record?"
        );

      if (!ok) return;

      try {
        await API.delete(
          `/internal-marks/${id}`
        );

        fetchData();
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ===========================
  SEARCH + FILTER
  ===========================
  */

  const filteredMarks =
    useMemo(() => {
      return marks.filter((m) => {
        const student =
          m.student?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const subject =
          m.subject?.subjectName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const semester =
          semesterFilter === ""
            ? true
            : Number(
                m.student
                  ?.semester
              ) ===
              Number(
                semesterFilter
              );

        return (
          (student ||
            subject) &&
          semester
        );
      });
    }, [
      marks,
      search,
      semesterFilter,
    ]);

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-8">
          Internal Marks
        </h1>

        {/* Analytics */}

        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">
              Total Records
            </h2>

            <p className="text-3xl font-bold">
              {stats.totalRecords || 0}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">
              Average
            </h2>

            <p className="text-3xl font-bold">
              {stats.averageInternal ||
                0}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">
              Highest
            </h2>

            <p className="text-3xl font-bold">
              {stats.highestInternal ||
                0}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">
              Lowest
            </h2>

            <p className="text-3xl font-bold">
              {stats.lowestInternal ||
                0}
            </p>
          </div>

        </div>

        {/* Add Form */}

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-white p-6 rounded shadow mb-8 grid md:grid-cols-2 gap-4"
        >
          <select
            value={
              form.student
            }
            onChange={(e) =>
              setForm({
                ...form,
                student:
                  e.target.value,
              })
            }
            className="border p-2 rounded"
          >
            <option value="">
              Select Student
            </option>

            {students.map((s) => (
              <option
                key={s._id}
                value={s._id}
              >
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={
              form.subject
            }
            onChange={(e) =>
              setForm({
                ...form,
                subject:
                  e.target.value,
              })
            }
            className="border p-2 rounded"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((s) => (
              <option
                key={s._id}
                value={s._id}
              >
                {s.subjectName}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Assignment Marks"
            className="border p-2 rounded"
            value={
              form.assignmentMarks
            }
            onChange={(e) =>
              setForm({
                ...form,
                assignmentMarks:
                  e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Attendance Marks"
            className="border p-2 rounded"
            value={
              form.attendanceMarks
            }
            onChange={(e) =>
              setForm({
                ...form,
                attendanceMarks:
                  e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Test Marks"
            className="border p-2 rounded"
            value={
              form.testMarks
            }
            onChange={(e) =>
              setForm({
                ...form,
                testMarks:
                  e.target.value,
              })
            }
          />

          <button
            className="bg-blue-600 text-white rounded p-2"
          >
            Save Marks
          </button>
        </form>

        {/* Filters */}

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Student or Subject"
            className="border p-2 rounded flex-1"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            className="border p-2 rounded"
            value={
              semesterFilter
            }
            onChange={(e) =>
              setSemesterFilter(
                e.target.value
              )
            }
          >
            <option value="">
              All Semesters
            </option>

            {[1,2,3,4,5,6,7,8]
              .map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  Semester {s}
                </option>
              ))}
          </select>

        </div>

        {/* Table */}

        <div className="bg-white rounded shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Subject
                </th>

                <th className="p-3">
                  Assignment
                </th>

                <th className="p-3">
                  Attendance
                </th>

                <th className="p-3">
                  Test
                </th>

                <th className="p-3">
                  Total
                </th>

                <th className="p-3">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-8"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredMarks
                  .length ===
                0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-8"
                  >
                    No Records Found
                  </td>
                </tr>
              ) : (
                filteredMarks.map(
                  (m) => (
                    <tr
                      key={m._id}
                      className="border-t"
                    >
                      <td className="p-3">
                        {
                          m.student
                            ?.name
                        }
                      </td>

                      <td className="p-3">
                        {
                          m.subject
                            ?.subjectName
                        }
                      </td>

                      <td className="p-3">
                        {
                          m.assignmentMarks
                        }
                      </td>

                      <td className="p-3">
                        {
                          m.attendanceMarks
                        }
                      </td>

                      <td className="p-3">
                        {
                          m.testMarks
                        }
                      </td>

                      <td className="p-3 font-bold">
                        {
                          m.totalInternal
                        }
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() =>
                            deleteMark(
                              m._id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
};

export default InternalMarks;
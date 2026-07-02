import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

const FacultySubject = () => {
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const [form, setForm] = useState({
    faculty: "",
    subject: "",
    semester: "",
  });

  const fetchData = async () => {
    try {
      const facultyRes = await API.get("/faculty");
      const subjectRes = await API.get("/subjects");
      const allocationRes = await API.get("/faculty-subjects");

      setFaculty(
        facultyRes.data?.faculty ||
        facultyRes.data?.data ||
        []
      );

      setSubjects(
        subjectRes.data?.subjects ||
        subjectRes.data?.data ||
        []
      );

      setAllocations(
        allocationRes.data?.allocations ||
        allocationRes.data?.data ||
        []
      );
    } catch (error) {
      console.log("Faculty Subject Error:", error);
      setFaculty([]);
      setSubjects([]);
      setAllocations([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/faculty-subjects",
        form
      );

      setForm({
        faculty: "",
        subject: "",
        semester: "",
      });

      fetchData();
    } catch (error) {
      console.log(error);
      alert("Assignment Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/faculty-subjects/${id}`
      );

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Faculty Subject Allocation
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-4 mb-6"
        >

          <select
            className="border p-2"
            value={form.faculty}
            onChange={(e) =>
              setForm({
                ...form,
                faculty: e.target.value,
              })
            }
          >
            <option value="">
              Select Faculty
            </option>

            {faculty.map((f) => (
              <option
                key={f._id}
                value={f._id}
              >
                {f.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2"
            value={form.subject}
            onChange={(e) =>
              setForm({
                ...form,
                subject: e.target.value,
              })
            }
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
            placeholder="Semester"
            className="border p-2"
            value={form.semester}
            onChange={(e) =>
              setForm({
                ...form,
                semester: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded md:col-span-3"
          >
            Assign Subject
          </button>

        </form>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">
                Faculty
              </th>

              <th className="border p-2">
                Subject
              </th>

              <th className="border p-2">
                Semester
              </th>

              <th className="border p-2">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {allocations.length > 0 ? (
              allocations.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">
                    {item.faculty?.name ||
                      "N/A"}
                  </td>

                  <td className="border p-2">
                    {item.subject
                      ?.subjectName || "N/A"}
                  </td>

                  <td className="border p-2">
                    {item.semester}
                  </td>

                  <td className="border p-2">
                    <button
                      onClick={() =>
                        handleDelete(
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
                  colSpan="4"
                  className="text-center p-4"
                >
                  No Allocations Found
                </td>
              </tr>
            )}

          </tbody>
        </table>

      </div>
    </Layout>
  );
};

export default FacultySubject;
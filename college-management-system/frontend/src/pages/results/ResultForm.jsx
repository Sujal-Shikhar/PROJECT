import { useEffect, useState } from "react";
import API from "../../api/axios";

const ResultForm = ({ refreshResults }) => {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    semester: "",
    subject: "",
    marks: "",
    maxMarks: 100,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/students");

    setStudents(res.data.students || []);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/results",
        formData
      );

      refreshResults();

      setFormData({
        student: "",
        semester: "",
        subject: "",
        marks: "",
        maxMarks: 100,
      });

      alert("Result Added");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-5 rounded shadow mb-6">

      <h2 className="text-xl font-bold mb-4">
        Add Result
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >
        <select
          name="student"
          value={formData.student}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={formData.marks}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="maxMarks"
          placeholder="Maximum Marks"
          value={formData.maxMarks}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          className="bg-blue-600 text-white p-2 rounded md:col-span-2"
        >
          Save Result
        </button>

      </form>

    </div>
  );
};

export default ResultForm;
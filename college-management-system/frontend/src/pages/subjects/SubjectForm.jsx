import { useState } from "react";
import API from "../../api/axios";

const SubjectForm = ({ refreshSubjects }) => {
  const [formData, setFormData] = useState({
    subjectCode: "",
    subjectName: "",
    semester: "",
    department: "",
    credits: 4,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/subjects", formData);

      setFormData({
        subjectCode: "",
        subjectName: "",
        semester: "",
        department: "",
        credits: 4,
      });

      refreshSubjects();

      alert("Subject Added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-5"
    >
      <h2 className="text-xl font-bold mb-4">
        Add Subject
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          name="subjectCode"
          placeholder="Subject Code"
          value={formData.subjectCode}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="subjectName"
          placeholder="Subject Name"
          value={formData.subjectName}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="semester"
          type="number"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="credits"
          type="number"
          placeholder="Credits"
          value={formData.credits}
          onChange={handleChange}
          className="border p-2 rounded"
        />

      </div>

      <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
        Add Subject
      </button>
    </form>
  );
};

export default SubjectForm;
import { useEffect, useState } from "react";
import API from "../../api/axios";

const PlacementForm = ({
  refreshPlacements,
}) => {
  const [students, setStudents] =
    useState([]);

  const [formData, setFormData] =
    useState({
      student: "",
      companyName: "",
      jobRole: "",
      package: "",
      status: "Applied",
    });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get(
        "/students"
      );

      setStudents(
        res.data.students || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/placements",
        formData
      );

      alert(
        "Placement Added Successfully"
      );

      setFormData({
        student: "",
        companyName: "",
        jobRole: "",
        package: "",
        status: "Applied",
      });

      refreshPlacements();
    } catch (error) {
      console.log(error);
      alert(
        "Failed to add placement"
      );
    }
  };

  return (
    <div className="bg-white p-5 rounded shadow mb-6">

      <h2 className="text-xl font-bold mb-4">
        Add Placement
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
          required
        >
          <option value="">
            Select Student
          </option>

          {students.map(
            (student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={
            formData.companyName
          }
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          value={
            formData.jobRole
          }
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="package"
          placeholder="Package (LPA)"
          value={
            formData.package
          }
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="status"
          value={
            formData.status
          }
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Applied">
            Applied
          </option>

          <option value="Selected">
            Selected
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded md:col-span-2"
        >
          Save Placement
        </button>

      </form>

    </div>
  );
};

export default PlacementForm;
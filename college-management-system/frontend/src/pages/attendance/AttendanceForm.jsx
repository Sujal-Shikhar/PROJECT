import {
  useEffect,
  useState,
} from "react";

import API from "../../api/axios";

const AttendanceForm = ({
  refreshAttendance,
}) => {
  const [students, setStudents] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      student: "",
      subject: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
      status: "Present",
    });

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents =
    async () => {
      try {
        const res =
          await API.get(
            "/students"
          );

        setStudents(
          res.data.students ||
            []
        );
      } catch (error) {
        console.log(error);
        setStudents([]);
      }
    };

  const fetchSubjects =
    async () => {
      try {
        const res =
          await API.get(
            "/subjects"
          );

        setSubjects(
          res.data.subjects ||
            []
        );
      } catch (error) {
        console.log(error);
        setSubjects([]);
      }
    };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await API.post(
          "/attendance",
          formData
        );

        alert(
          "Attendance Marked Successfully"
        );

        setFormData({
          student: "",
          subject: "",
          date: new Date()
            .toISOString()
            .split("T")[0],
          status:
            "Present",
        });

        if (
          refreshAttendance
        ) {
          refreshAttendance();
        }
      } catch (error) {
        console.log(error);

        alert(
          error
            ?.response?.data
            ?.message ||
            "Failed to mark attendance"
        );
      }
    };

  return (
    <div className="bg-white shadow rounded p-6 mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Mark Attendance
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
        className="grid md:grid-cols-2 gap-4"
      >

        {/* Student */}

        <div>
          <label className="block mb-1 font-medium">
            Student
          </label>

          <select
            name="student"
            value={
              formData.student
            }
            onChange={
              handleChange
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              Select Student
            </option>

            {students.map(
              (
                student
              ) => (
                <option
                  key={
                    student._id
                  }
                  value={
                    student._id
                  }
                >
                  {
                    student.name
                  }
                </option>
              )
            )}
          </select>
        </div>

        {/* Subject */}

        <div>
          <label className="block mb-1 font-medium">
            Subject
          </label>

          <select
            name="subject"
            value={
              formData.subject
            }
            onChange={
              handleChange
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map(
              (
                subject
              ) => (
                <option
                  key={
                    subject._id
                  }
                  value={
                    subject._id
                  }
                >
                  {subject.subjectName ||
                    subject.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Date */}

        <div>
          <label className="block mb-1 font-medium">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={
              formData.date
            }
            onChange={
              handleChange
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Status */}

        <div>
          <label className="block mb-1 font-medium">
            Status
          </label>

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            className="w-full border p-2 rounded"
          >
            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>
          </select>
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 md:col-span-2"
        >
          Save Attendance
        </button>

      </form>

    </div>
  );
};

export default AttendanceForm;
import { useEffect, useState } from "react";

import {
  getSubjects,
} from "../../api/subjectApi";

import {
  getFaculty,
} from "../../api/facultyApi";

export default function ExamForm({

  initialData,

  onSubmit,

  loading,

}) {

  const [subjects, setSubjects] =
    useState([]);

  const [faculty, setFaculty] =
    useState([]);

  const [form, setForm] =
    useState({

      examName: "",

      examType: "Internal",

      subject: "",

      faculty: "",

      department: "CSE",

      semester: 1,

      examDate: "",

      startTime: "",

      endTime: "",

      roomNumber: "",

      totalMarks: 100,

      passingMarks: 40,

      instructions: "",

    });

  useEffect(() => {

    loadData();

  }, []);

  useEffect(() => {

    if (initialData) {

      setForm({

        ...initialData,

        examDate:
          initialData.examDate
            ?.split("T")[0],

      });

    }

  }, [initialData]);

  const loadData = async () => {

    const s =
      await getSubjects();

    const f =
      await getFaculty();

    setSubjects(
      s.subjects || []
    );

    setFaculty(
      f.faculty || []
    );

  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  const submit = (e) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <form
      onSubmit={submit}
      className="bg-white rounded-xl shadow p-6 space-y-5"
    >

      <div className="grid md:grid-cols-2 gap-5">

        <input
          name="examName"
          placeholder="Exam Name"
          value={form.examName}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <select
          name="examType"
          value={form.examType}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >

          <option>
            Internal
          </option>

          <option>
            Mid Semester
          </option>

          <option>
            End Semester
          </option>

          <option>
            Practical
          </option>

          <option>
            Viva
          </option>

        </select>

        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >

          <option value="">
            Select Subject
          </option>

          {subjects.map(
            (sub) => (
              <option
                key={sub._id}
                value={sub._id}
              >
                {sub.name}
              </option>
            )
          )}

        </select>

        <select
          name="faculty"
          value={form.faculty}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >

          <option value="">
            Select Faculty
          </option>

          {faculty.map(
            (fac) => (
              <option
                key={fac._id}
                value={fac._id}
              >
                {fac.name}
              </option>
            )
          )}

        </select>

        <input
          type="date"
          name="examDate"
          value={form.examDate}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          name="roomNumber"
          placeholder="Room Number"
          value={form.roomNumber}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="semester"
          min={1}
          max={8}
          value={form.semester}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >

          {[
            "CSE",
            "IT",
            "ECE",
            "EEE",
            "ME",
            "CE",
            "AI",
            "DS",
          ].map((dept) => (
            <option
              key={dept}
            >
              {dept}
            </option>
          ))}

        </select>

        <input
          type="number"
          name="totalMarks"
          value={form.totalMarks}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="passingMarks"
          value={form.passingMarks}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

      </div>

      <textarea
        rows={4}
        name="instructions"
        placeholder="Instructions"
        value={form.instructions}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : "Save Exam"}
      </button>

    </form>

  );

}
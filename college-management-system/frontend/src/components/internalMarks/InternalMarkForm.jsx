import { useEffect, useState } from "react";

const InternalMarkForm = ({
  initialValues,
  students = [],
  subjects = [],
  faculty = [],
  exams = [],
  onSubmit,
  loading,
}) => {

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    faculty: "",
    exam: "",

    assignmentMarks: 0,
    quizMarks: 0,
    attendanceMarks: 0,
    practicalMarks: 0,
    vivaMarks: 0,
    internalExamMarks: 0,

    remarks: "",
  });


  useEffect(() => {

    if (initialValues) {

      setFormData((prev) => ({
        ...prev,
        ...initialValues,
      }));

    }

  }, [initialValues]);


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const submitHandler = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };


  return (

    <form
      onSubmit={submitHandler}
      className="bg-white rounded-xl shadow p-6 space-y-6"
    >

      <div className="grid grid-cols-2 gap-5">


        {/* Student */}

        <select
          name="student"
          value={formData.student}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
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



        {/* Subject */}

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        >

          <option value="">
            Select Subject
          </option>


          {subjects.map((subject) => (

            <option
              key={subject._id}
              value={subject._id}
            >
              {subject.name}
            </option>

          ))}


        </select>




        {/* Faculty */}

        <select
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
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





        {/* Exam */}

        <select
          name="exam"
          value={formData.exam}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        >

          <option value="">
            Select Exam
          </option>


          {exams.map((exam) => (

            <option
              key={exam._id}
              value={exam._id}
            >
              {exam.examType || exam.name}
            </option>

          ))}


        </select>



      </div>





      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

  {[
    {
      name: "assignmentMarks",
      label: "Assignment Marks",
    },
    {
      name: "quizMarks",
      label: "Quiz Marks",
    },
    {
      name: "attendanceMarks",
      label: "Attendance Marks",
    },
    {
      name: "practicalMarks",
      label: "Practical Marks",
    },
    {
      name: "vivaMarks",
      label: "Viva Marks",
    },
    {
      name: "internalExamMarks",
      label: "Internal Exam Marks",
    },
  ].map((field) => (
    <div key={field.name}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>

      <input
        type="number"
        min="0"
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  ))}

</div>




      <textarea

        rows={4}

        name="remarks"

        value={formData.remarks}

        onChange={handleChange}

        placeholder="Remarks"

        className="border rounded-lg p-3 w-full"

      />





      <button

        disabled={loading}

        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

      >

        {loading
          ? "Saving..."
          : "Save Internal Marks"}

      </button>



    </form>

  );

};


export default InternalMarkForm;
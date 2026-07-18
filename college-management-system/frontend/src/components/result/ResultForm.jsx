import { useEffect, useState } from "react";
import { getStudents } from "../../api/studentApi";
import { getSubjects } from "../../api/subjectApi";
import { getExams } from "../../api/examApi";

const ResultForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  isEdit = false,
}) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    exam: "",
    externalMarks: "",
    remarks: "",
  });

  useEffect(() => {
    loadDropdowns();
  }, []);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        student:
          initialData.student?._id ||
          initialData.student ||
          "",

        subject:
          initialData.subject?._id ||
          initialData.subject ||
          "",

        exam:
          initialData.exam?._id ||
          initialData.exam ||
          "",

        externalMarks:
          initialData.externalMarks ?? "",

        remarks:
          initialData.remarks || "",
      });
    }
  }, [initialData]);

  const loadDropdowns = async () => {
    try {
      const [studentRes, subjectRes, examRes] =
        await Promise.all([
          getStudents(),
          getSubjects(),
          getExams(),
        ]);

      setStudents(
        studentRes.students ||
          studentRes.data?.students ||
          []
      );

      setSubjects(
        subjectRes.subjects ||
          subjectRes.data?.subjects ||
          []
      );

      setExams(
        examRes.exams ||
          examRes.data?.exams ||
          []
      );
    } catch (error) {
      console.error("Dropdown Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.student)
      newErrors.student = "Student is required";

    if (!formData.subject)
      newErrors.subject = "Subject is required";

    if (!formData.exam)
      newErrors.exam = "Exam is required";

    if (
      formData.externalMarks === "" ||
      formData.externalMarks === null
    ) {
      newErrors.externalMarks =
        "External Marks is required";
    }

    if (
      Number(formData.externalMarks) < 0 ||
      Number(formData.externalMarks) > 100
    ) {
      newErrors.externalMarks =
        "Marks should be between 0 and 100";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      student: formData.student,
      subject: formData.subject,
      exam: formData.exam,
      externalMarks: Number(
        formData.externalMarks
      ),
      remarks: formData.remarks,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Student */}

          <div>
            <label className="block mb-2 font-medium">
              Student *
            </label>

            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              disabled={isEdit}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.name} ({student.rollNumber})
                </option>
              ))}
            </select>

            {errors.student && (
              <p className="text-red-500 text-sm mt-1">
                {errors.student}
              </p>
            )}
          </div>

          {/* Subject */}

          <div>
            <label className="block mb-2 font-medium">
              Subject *
            </label>

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isEdit}
              className="w-full border rounded-lg px-3 py-2"
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

            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Exam */}

          <div>
            <label className="block mb-2 font-medium">
              Exam *
            </label>

            <select
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              disabled={isEdit}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                Select Exam
              </option>

              {exams.map((exam) => (
                <option
                  key={exam._id}
                  value={exam._id}
                >
                  {exam.name} ({exam.examType})
                </option>
              ))}
            </select>

            {errors.exam && (
              <p className="text-red-500 text-sm mt-1">
                {errors.exam}
              </p>
            )}
          </div>

          {/* External Marks */}

          <div>
            <label className="block mb-2 font-medium">
              External Marks *
            </label>

            <input
              type="number"
              name="externalMarks"
              value={formData.externalMarks}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter External Marks"
            />

            {errors.externalMarks && (
              <p className="text-red-500 text-sm mt-1">
                {errors.externalMarks}
              </p>
            )}
          </div>
        </div>

        {/* Remarks */}

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Remarks
          </label>

          <textarea
            rows="4"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter remarks"
          />
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-8">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Result"
              : "Save Result"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResultForm;
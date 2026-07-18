import { useEffect, useState } from "react";
import { getExamById } from "../../api/examApi";

export default function ExamDetailsCard({ examId }) {
  const [exam, setExam] = useState(null);

  useEffect(() => {
    loadExam();
  }, [examId]);

  const loadExam = async () => {
    try {
      const res = await getExamById(examId);
      setExam(res.exam);
    } catch (err) {
      console.error(err);
    }
  };

  if (!exam)
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading...
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        {exam.examName}
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <b>Subject</b>
          <p>{exam.subject?.name}</p>
        </div>

        <div>
          <b>Faculty</b>
          <p>{exam.faculty?.name}</p>
        </div>

        <div>
          <b>Department</b>
          <p>{exam.department}</p>
        </div>

        <div>
          <b>Semester</b>
          <p>{exam.semester}</p>
        </div>

        <div>
          <b>Exam Type</b>
          <p>{exam.examType}</p>
        </div>

        <div>
          <b>Date</b>
          <p>
            {new Date(
              exam.examDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <b>Start Time</b>
          <p>{exam.startTime}</p>
        </div>

        <div>
          <b>End Time</b>
          <p>{exam.endTime}</p>
        </div>

        <div>
          <b>Room</b>
          <p>{exam.roomNumber}</p>
        </div>

        <div>
          <b>Total Marks</b>
          <p>{exam.totalMarks}</p>
        </div>

        <div>
          <b>Passing Marks</b>
          <p>{exam.passingMarks}</p>
        </div>

      </div>

      <div className="mt-6">
        <b>Instructions</b>

        <p className="mt-2 text-gray-600">
          {exam.instructions || "-"}
        </p>
      </div>

    </div>
  );
}
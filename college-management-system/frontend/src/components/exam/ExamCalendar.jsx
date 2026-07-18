export default function ExamCalendar({
  exams,
}) {
  return (
    <div className="bg-white rounded-xl shadow">

      <div className="p-5 border-b">

        <h2 className="text-lg font-semibold">
          Exam Calendar
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Date
            </th>

            <th className="p-3 text-left">
              Exam
            </th>

            <th className="p-3 text-left">
              Department
            </th>

            <th className="p-3 text-left">
              Semester
            </th>

            <th className="p-3 text-left">
              Time
            </th>

            <th className="p-3 text-left">
              Room
            </th>

          </tr>

        </thead>

        <tbody>

          {exams.map((exam) => (

            <tr
              key={exam._id}
              className="border-t"
            >

              <td className="p-3">
                {new Date(
                  exam.examDate
                ).toLocaleDateString()}
              </td>

              <td className="p-3">
                {exam.examName}
              </td>

              <td className="p-3">
                {exam.department}
              </td>

              <td className="p-3">
                {exam.semester}
              </td>

              <td className="p-3">
                {exam.startTime} - {exam.endTime}
              </td>

              <td className="p-3">
                {exam.roomNumber}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
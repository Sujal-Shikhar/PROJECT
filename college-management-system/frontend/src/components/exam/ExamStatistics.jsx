export default function ExamStatistics({
  stats,
}) {

  if (!stats)
    return null;

  return (

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

      <div className="bg-blue-600 text-white rounded-xl p-5">
        <p>Total Exams</p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.totalExams}
        </h2>
      </div>

      <div className="bg-green-600 text-white rounded-xl p-5">
        <p>Scheduled</p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.scheduledExams}
        </h2>
      </div>

      <div className="bg-indigo-600 text-white rounded-xl p-5">
        <p>Completed</p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.completedExams}
        </h2>
      </div>

      <div className="bg-red-600 text-white rounded-xl p-5">
        <p>Cancelled</p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.cancelledExams}
        </h2>
      </div>

    </div>

  );

}
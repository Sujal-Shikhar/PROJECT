import {
  CalendarDays,
  Clock3,
  BookOpen,
} from "lucide-react";

export default function ExamDashboard({
  dashboard,
}) {
  if (!dashboard) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">

      <div className="bg-blue-600 text-white rounded-xl p-6 flex justify-between items-center">
        <div>
          <p className="text-sm">
            Upcoming Exams
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {dashboard.upcoming}
          </h2>
        </div>

        <CalendarDays size={48} />
      </div>

      <div className="bg-white rounded-xl shadow p-5">

        <h3 className="font-semibold mb-4">
          Latest Exams
        </h3>

        {dashboard.latestExams?.length ? (
          dashboard.latestExams.map(
            (exam) => (
              <div
                key={exam._id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>

                  <p className="font-medium">
                    {exam.examName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {exam.subject?.name}
                  </p>

                </div>

                <Clock3
                  size={18}
                  className="text-gray-400"
                />

              </div>
            )
          )
        ) : (
          <p>No exams found.</p>
        )}

      </div>
    </div>
  );
}
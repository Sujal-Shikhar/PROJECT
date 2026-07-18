import { useEffect, useState } from "react";
import { dashboardSummary } from "../../api/subjectApi";

export default function SubjectDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await dashboardSummary();
    setSummary(data);
  };

  if (!summary) return null;

  const cards = [
    {
      title: "Total Subjects",
      value: summary.totalSubjects,
    },
    {
      title: "Departments",
      value: summary.totalDepartments,
    },
    {
      title: "Theory",
      value: summary.theorySubjects,
    },
    {
      title: "Lab",
      value: summary.labSubjects,
    },
    {
      title: "Electives",
      value: summary.electiveSubjects,
    },
    {
      title: "Assigned Faculty",
      value: summary.assignedFaculty,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-5"
        >
          <h3 className="text-sm text-gray-500">
            {card.title}
          </h3>

          <h1 className="text-3xl font-bold mt-2">
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}
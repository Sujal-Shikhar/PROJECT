import { useEffect, useState } from "react";

import {
  getSubjectStats,
} from "../../api/subjectApi";

export default function SubjectStatistics() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    const data =
      await getSubjectStats();

    setStats(data);

  };

  if (!stats)
    return <div>Loading...</div>;

  return (

    <div className="grid md:grid-cols-4 gap-6">

      <Card
        title="Total Subjects"
        value={stats.totalSubjects}
      />

      <Card
        title="Theory"
        value={stats.theorySubjects}
      />

      <Card
        title="Lab"
        value={stats.labSubjects}
      />

      <Card
        title="Elective"
        value={stats.electiveSubjects}
      />

    </div>

  );

}

function Card({
  title,
  value,
}) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-2">
        {value}
      </h1>

    </div>

  );

}
import { useEffect, useState } from "react";

import { getTodayTimetable } from "../../api/timetableApi";

import TimetableTable from "../../components/timetable/TimetableTable";

const TodayTimetable = () => {

  const [timetable, setTimetable] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const res =
      await getTodayTimetable();

    setTimetable(
      res.timetable || []
    );

  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Today's Timetable
      </h1>

      <TimetableTable
        timetable={timetable}
        onDelete={() => {}}
      />

    </div>
  );
};

export default TodayTimetable;
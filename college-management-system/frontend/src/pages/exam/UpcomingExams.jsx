import PageHeader from "../../components/common/PageHeader";
import ExamTable from "../../components/exam/ExamTable";

export default function UpcomingExams() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Upcoming Exams"
        subtitle="Scheduled examinations"
      />

      <ExamTable upcomingOnly />
    </div>
  );
}
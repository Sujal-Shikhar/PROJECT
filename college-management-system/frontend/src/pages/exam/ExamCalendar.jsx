import PageHeader from "../../components/common/PageHeader";
import ExamCalendar from "../../components/exam/ExamCalendar";

export default function ExamCalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Calendar"
        subtitle="Monthly examination schedule"
      />

      <ExamCalendar />
    </div>
  );
}
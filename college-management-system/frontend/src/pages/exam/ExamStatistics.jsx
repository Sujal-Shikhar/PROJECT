import PageHeader from "../../components/common/PageHeader";
import ExamStatistics from "../../components/exam/ExamStatistics";

export default function ExamStatisticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Statistics"
        subtitle="View examination analytics"
      />

      <ExamStatistics />
    </div>
  );
}
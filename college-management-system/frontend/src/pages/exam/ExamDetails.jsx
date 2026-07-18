import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import ExamDetailsCard from "../../components/exam/ExamDetailsCard";

export default function ExamDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Details"
        subtitle="View examination information"
      />

      <ExamDetailsCard examId={id} />
    </div>
  );
}
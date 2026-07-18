import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createFee } from "../../api/feeApi";
import FeeForm from "../../components/fee/FeeForm";

const AddFee = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    academicYear: "",
    semester: "",
    totalFee: "",
    amountPaid: 0,
    paymentMethod: "Cash",
    remarks: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createFee(formData);

      toast.success("Fee record created successfully.");

      navigate("/fees");
    } catch (error) {
      console.error(error);

      toast.error("Unable to create fee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Add Fee
        </h1>

        <p className="text-gray-500">
          Create a new student fee record.
        </p>

      </div>

      <FeeForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddFee;
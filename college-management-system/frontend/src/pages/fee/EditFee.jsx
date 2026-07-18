import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getFeeById,
  updateFee,
} from "../../api/feeApi";

import FeeForm from "../../components/fee/FeeForm";

const EditFee = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      student: "",
      academicYear: "",
      semester: "",
      totalFee: "",
      amountPaid: "",
      paymentMethod: "Cash",
      remarks: "",
    });

  useEffect(() => {

    loadFee();

  }, []);

  const loadFee = async () => {

    try {

      const res =
        await getFeeById(id);

      setFormData({
  student: res.fee.student?._id || res.fee.student || "",
  academicYear: res.fee.academicYear || "",
  semester: res.fee.semester || "",
  totalFee: res.fee.totalFee || "",
  amountPaid: res.fee.amountPaid || "",
  paymentMethod: res.fee.paymentMethod || "Cash",
  remarks: res.fee.remarks || "",
});

    }

    catch {

      toast.error("Unable to load fee.");

    }

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await updateFee(
          id,
          formData
        );

        toast.success(
          "Fee updated successfully."
        );

        navigate("/fees");

      }

      catch {

        toast.error(
          "Update failed."
        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Fee

        </h1>

      </div>

      <FeeForm

        formData={formData}

        setFormData={setFormData}

        onSubmit={handleSubmit}

        loading={loading}

        isEdit

      />

    </div>

  );

};

export default EditFee;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import toast from "react-hot-toast";

import { getFeeById } from "../../api/feeApi";

const FeeDetails = () => {

  const { id } = useParams();

  const [fee, setFee] =
    useState(null);

  useEffect(() => {

    loadFee();

  }, []);

  const loadFee = async () => {

    try {

      const res =
        await getFeeById(id);

      setFee(res.fee);

    }

    catch {

      toast.error(
        "Unable to load fee."
      );

    }

  };

  if (!fee)
    return (
      <div>Loading...</div>
    );

  return (

    <div className="bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Fee Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <Info
          title="Student"
          value={fee.student?.name}
        />

        <Info
          title="Roll Number"
          value={fee.student?.rollNumber}
        />

        <Info
          title="Academic Year"
          value={fee.academicYear}
        />

        <Info
          title="Semester"
          value={fee.semester}
        />

        <Info
          title="Total Fee"
          value={`₹${fee.totalFee}`}
        />

        <Info
          title="Amount Paid"
          value={`₹${fee.amountPaid}`}
        />

        <Info
          title="Balance"
          value={`₹${fee.balance}`}
        />

        <Info
          title="Status"
          value={fee.paymentStatus}
        />

        <Info
          title="Method"
          value={fee.paymentMethod}
        />

        <Info
          title="Payment Date"
          value={
            fee.paymentDate
              ? new Date(
                  fee.paymentDate
                ).toLocaleDateString()
              : "-"
          }
        />

      </div>

      <div className="mt-6">

        <label className="font-semibold">

          Remarks

        </label>

        <div className="border rounded-lg mt-2 p-4">

          {fee.remarks || "-"}

        </div>

      </div>

      <Link

        to="/fees"

        className="inline-block mt-8 px-5 py-2 bg-gray-700 text-white rounded-lg"

      >

        Back

      </Link>

    </div>

  );

};

const Info = ({
  title,
  value,
}) => (

  <div>

    <label className="text-gray-500">

      {title}

    </label>

    <p className="font-semibold">

      {value}

    </p>

  </div>

);

export default FeeDetails;
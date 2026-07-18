import { useEffect, useState } from "react";

import { getPendingFees } from "../../api/feeApi";

import FeeTable from "../../components/fee/FeeTable";

const PendingFees = () => {

  const [fees, setFees] =
    useState([]);

  useEffect(() => {

    loadFees();

  }, []);

  const loadFees = async () => {

    const res =
      await getPendingFees();

    setFees(
      res.fees || []
    );

  };

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Pending Fees

      </h1>

      <FeeTable

        fees={fees}

        onDelete={() => {}}

        onPayment={() => {}}

      />

    </div>

  );

};

export default PendingFees;
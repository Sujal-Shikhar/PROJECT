import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getFees,
  deleteFee,
  recordPayment,
  getFeeStats,
} from "../../api/feeApi";

import FeeTable from "../../components/fee/FeeTable";
import FeeFilters from "../../components/fee/FeeFilters";
import FeeStatsCards from "../../components/fee/FeeStatsCards";

const FeeList = () => {

  const [fees, setFees] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [filters, setFilters] =
    useState({

      search: "",

      paymentStatus: "",

      semester: "",

      academicYear: "",

    });

  useEffect(() => {

    fetchFees();

    fetchStats();

  }, []);

  const fetchFees = async () => {

    try {

      setLoading(true);

      const res =
        await getFees();

      setFees(
        res.fees || []
      );

    }

    catch (error) {

      console.error(error);

      toast.error(
        "Unable to fetch fees."
      );

    }

    finally {

      setLoading(false);

    }

  };

  const fetchStats = async () => {

    try {

      const res =
        await getFeeStats();

      setStats(res);

    }

    catch (error) {

      console.error(error);

    }

  };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete fee record?"
        )
      ) return;

      try {

        await deleteFee(id);

        toast.success(
          "Fee deleted successfully."
        );

        fetchFees();

        fetchStats();

      }

      catch {

        toast.error(
          "Unable to delete."
        );

      }

    };

  const handlePayment =
    async (fee) => {

      const amount =
        window.prompt(
          "Enter payment amount"
        );

      if (!amount) return;

      try {

        await recordPayment(
          fee._id,
          {

            amount:
              Number(amount),

          }
        );

        toast.success(
          "Payment recorded."
        );

        fetchFees();

        fetchStats();

      }

      catch {

        toast.error(
          "Payment failed."
        );

      }

    };

  const filtered =
    fees.filter((fee) => {

      const matchesSearch =
        !filters.search ||

        fee.student?.name
          ?.toLowerCase()
          .includes(
            filters.search.toLowerCase()
          ) ||

        fee.student?.rollNumber
          ?.toLowerCase()
          .includes(
            filters.search.toLowerCase()
          );

      const matchesStatus =
        !filters.paymentStatus ||

        fee.paymentStatus ===
          filters.paymentStatus;

      const matchesSemester =
        !filters.semester ||

        fee.semester ===
          Number(
            filters.semester
          );

      const matchesYear =
        !filters.academicYear ||

        fee.academicYear.includes(
          filters.academicYear
        );

      return (

        matchesSearch &&

        matchesStatus &&

        matchesSemester &&

        matchesYear

      );

    });

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Fee Management
          </h1>

          <p className="text-gray-500">
            Manage student fee records.
          </p>

        </div>

        <Link
          to="/fees/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Fee
        </Link>

      </div>

      <FeeStatsCards
        stats={stats}
      />

      <FeeFilters

        filters={filters}

        onChange={(e)=>

          setFilters({

            ...filters,

            [e.target.name]:
              e.target.value,

          })

        }

        onReset={()=>

          setFilters({

            search:"",

            paymentStatus:"",

            semester:"",

            academicYear:"",

          })

        }

      />

      {loading ? (

        <div className="bg-white rounded-xl p-10 text-center">

          Loading...

        </div>

      ) : (

        <FeeTable

          fees={filtered}

          onDelete={handleDelete}

          onPayment={handlePayment}

        />

      )}

    </div>

  );

};

export default FeeList;
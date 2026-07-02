import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import FeeForm from "./FeeForm";

const Fees = () => {
  const [fees, setFees] =
    useState([]);

  const fetchFees =
    async () => {
      try {
        const res =
          await API.get(
            "/fees"
          );

        setFees(
          res.data.fees ||
            []
        );
      } catch (error) {
        console.log(error);
        setFees([]);
      }
    };

  useEffect(() => {
    fetchFees();
  }, []);

  const deleteFee =
    async (id) => {
      try {
        await API.delete(
          `/fees/${id}`
        );

        fetchFees();
      } catch (error) {
        console.log(error);
      }
    };

  const totalFee =
    fees.reduce(
      (sum, fee) =>
        sum +
        Number(
          fee.totalFee ||
            0
        ),
      0
    );

  const totalPaid =
    fees.reduce(
      (sum, fee) =>
        sum +
        Number(
          fee.paidAmount ||
            0
        ),
      0
    );

  const totalPending =
    fees.reduce(
      (sum, fee) =>
        sum +
        Number(
          fee.dueAmount ||
            0
        ),
      0
    );

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Fee Management
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-600 text-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold">
              Total Fees
            </h2>

            <p className="text-3xl font-bold mt-2">
              ₹{totalFee}
            </p>
          </div>

          <div className="bg-green-600 text-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold">
              Total Paid
            </h2>

            <p className="text-3xl font-bold mt-2">
              ₹{totalPaid}
            </p>
          </div>

          <div className="bg-red-600 text-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold">
              Pending Fees
            </h2>

            <p className="text-3xl font-bold mt-2">
              ₹
              {
                totalPending
              }
            </p>
          </div>
        </div>

        <FeeForm
          refreshFees={
            fetchFees
          }
        />

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Semester
                </th>

                <th className="p-3">
                  Total Fee
                </th>

                <th className="p-3">
                  Paid
                </th>

                <th className="p-3">
                  Due
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Payment Date
                </th>

                <th className="p-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {fees.length >
              0 ? (
                fees.map(
                  (
                    fee
                  ) => (
                    <tr
                      key={
                        fee._id
                      }
                      className="border-t"
                    >
                      <td className="p-3">
                        {fee
                          .student
                          ?.name ||
                          "N/A"}
                      </td>

                      <td className="p-3">
                        {
                          fee.semester
                        }
                      </td>

                      <td className="p-3">
                        ₹
                        {
                          fee.totalFee
                        }
                      </td>

                      <td className="p-3">
                        ₹
                        {
                          fee.paidAmount
                        }
                      </td>

                      <td className="p-3">
                        ₹
                        {
                          fee.dueAmount
                        }
                      </td>

                      <td className="p-3">
                        {
                          fee.status
                        }
                      </td>

                      <td className="p-3">
                        {new Date(
                          fee.paymentDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() =>
                            deleteFee(
                              fee._id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-4"
                  >
                    No Fee
                    Records
                    Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Fees;
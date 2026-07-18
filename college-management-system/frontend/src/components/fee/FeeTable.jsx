import { Link } from "react-router-dom";
import {
  Pencil,
  Eye,
  Trash2,
  IndianRupee,
} from "lucide-react";

const statusColor = {
  Paid: "bg-green-100 text-green-700",
  Partial: "bg-yellow-100 text-yellow-700",
  Pending: "bg-red-100 text-red-700",
};

const FeeTable = ({
  fees,
  onDelete,
  onPayment,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-3 text-left">
              Student
            </th>

            <th className="px-6 py-3 text-left">
              Academic Year
            </th>

            <th className="px-6 py-3 text-left">
              Semester
            </th>

            <th className="px-6 py-3 text-right">
              Total Fee
            </th>

            <th className="px-6 py-3 text-right">
              Paid
            </th>

            <th className="px-6 py-3 text-right">
              Balance
            </th>

            <th className="px-6 py-3 text-center">
              Status
            </th>

            <th className="px-6 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {fees.length === 0 ? (

            <tr>

              <td
                colSpan={8}
                className="text-center py-10 text-gray-500"
              >
                No fee records found.
              </td>

            </tr>

          ) : (

            fees.map((fee) => (

              <tr
                key={fee._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4">

                  <div className="font-semibold">
                    {fee.student?.name}
                  </div>

                  <div className="text-xs text-gray-500">
                    {fee.student?.rollNumber}
                  </div>

                </td>

                <td className="px-6 py-4">
                  {fee.academicYear}
                </td>

                <td className="px-6 py-4">
                  {fee.semester}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹{fee.totalFee}
                </td>

                <td className="px-6 py-4 text-right text-green-600">
                  ₹{fee.amountPaid}
                </td>

                <td className="px-6 py-4 text-right text-red-600">
                  ₹{fee.balance}
                </td>

                <td className="px-6 py-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[fee.paymentStatus]}`}
                  >
                    {fee.paymentStatus}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <Link
                      to={`/fees/${fee._id}`}
                      className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      to={`/fees/edit/${fee._id}`}
                      className="p-2 rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() =>
                        onPayment(fee)
                      }
                      className="p-2 rounded bg-green-100 text-green-600 hover:bg-green-200"
                    >
                      <IndianRupee size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(fee._id)
                      }
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default FeeTable;
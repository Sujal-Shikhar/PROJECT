import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import PlacementForm from "./PlacementForm";
import EditPlacementForm from "./EditPlacementForm";

const Placements = () => {
  const [placements, setPlacements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedPlacement,
    setSelectedPlacement,
  ] = useState(null);

  const fetchPlacements =
    async () => {
      try {
        const res =
          await API.get(
            "/placements"
          );

        setPlacements(
          res.data.placements || []
        );
      } catch (error) {
        console.log(error);
        setPlacements([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const deletePlacement =
    async (id) => {
      if (
        !window.confirm(
          "Delete Placement Record?"
        )
      )
        return;

      try {
        await API.delete(
          `/placements/${id}`
        );

        fetchPlacements();
      } catch (error) {
        console.log(error);
      }
    };

  const totalPlacements =
    placements.length;

  const selectedCount =
    placements.filter(
      (p) =>
        p.status === "Selected"
    ).length;

  const rejectedCount =
    placements.filter(
      (p) =>
        p.status === "Rejected"
    ).length;

  const highestPackage =
    placements.length > 0
      ? Math.max(
          ...placements.map(
            (p) =>
              Number(
                p.package
              ) || 0
          )
        )
      : 0;

  const averagePackage =
    placements.length > 0
      ? (
          placements.reduce(
            (acc, curr) =>
              acc +
              Number(
                curr.package
              ),
            0
          ) / placements.length
        ).toFixed(2)
      : 0;

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Placement Management
        </h1>

        <div className="grid md:grid-cols-5 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow">
            <h3>Total Placements</h3>

            <p className="text-2xl font-bold">
              {totalPlacements}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Selected</h3>

            <p className="text-2xl font-bold text-green-600">
              {selectedCount}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Rejected</h3>

            <p className="text-2xl font-bold text-red-600">
              {rejectedCount}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Highest Package</h3>

            <p className="text-2xl font-bold text-blue-600">
              ₹{highestPackage}
              LPA
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Average Package</h3>

            <p className="text-2xl font-bold text-purple-600">
              ₹{averagePackage}
              LPA
            </p>
          </div>

        </div>

        <PlacementForm
          refreshPlacements={
            fetchPlacements
          }
        />

        {selectedPlacement && (
          <EditPlacementForm
            placement={
              selectedPlacement
            }
            refreshPlacements={
              fetchPlacements
            }
            closeModal={() =>
              setSelectedPlacement(
                null
              )
            }
          />
        )}

        <div className="bg-white shadow rounded overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Company
                </th>

                <th className="p-3">
                  Role
                </th>

                <th className="p-3">
                  Package
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Date
                </th>

                <th className="p-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-5"
                  >
                    Loading...
                  </td>
                </tr>

              ) : placements.length ===
                0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-5"
                  >
                    No Placement Records
                  </td>
                </tr>

              ) : (

                placements.map(
                  (item) => (
                    <tr
                      key={item._id}
                      className="border-t"
                    >

                      <td className="p-3">
                        {
                          item.student
                            ?.name
                        }
                      </td>

                      <td className="p-3">
                        {
                          item.companyName
                        }
                      </td>

                      <td className="p-3">
                        {
                          item.jobRole
                        }
                      </td>

                      <td className="p-3">
                        ₹
                        {
                          item.package
                        }
                        LPA
                      </td>

                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded text-white ${
                            item.status ===
                            "Selected"
                              ? "bg-green-600"
                              : item.status ===
                                "Rejected"
                              ? "bg-red-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          {
                            item.status
                          }
                        </span>

                      </td>

                      <td className="p-3">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3 space-x-2">

                        <button
                          onClick={() =>
                            setSelectedPlacement(
                              item
                            )
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deletePlacement(
                              item._id
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

              )}

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
};

export default Placements;
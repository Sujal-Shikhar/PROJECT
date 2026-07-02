import { useState } from "react";
import API from "../../api/axios";

const EditPlacementForm = ({
  placement,
  refreshPlacements,
  closeModal,
}) => {
  const [formData, setFormData] =
    useState({
      companyName:
        placement.companyName || "",
      jobRole:
        placement.jobRole || "",
      package:
        placement.package || "",
      status:
        placement.status || "Applied",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.put(
        `/placements/${placement._id}`,
        formData
      );

      alert(
        "Placement Updated Successfully"
      );

      refreshPlacements();
      closeModal();
    } catch (error) {
      console.log(error);
      alert(
        "Failed to Update Placement"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-[500px]">

        <h2 className="text-2xl font-bold mb-4">
          Edit Placement
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="companyName"
            placeholder="Company"
            value={
              formData.companyName
            }
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="jobRole"
            placeholder="Job Role"
            value={
              formData.jobRole
            }
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="package"
            placeholder="Package"
            value={
              formData.package
            }
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <select
            name="status"
            value={
              formData.status
            }
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Applied">
              Applied
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

          <div className="flex gap-2">

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditPlacementForm;
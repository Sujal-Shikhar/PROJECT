import { useState } from "react";
import {
  getCompanyPlacements,
} from "../../api/placementApi";

import PlacementTable from "../../components/placement/PlacementTable";

const CompanyPlacements = () => {
  const [company, setCompany] = useState("");
  const [placements, setPlacements] = useState([]);

  const search = async () => {
    if (!company) return;

    try {
      const res =
        await getCompanyPlacements(company);

      setPlacements(res.placements || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Company Placements
      </h1>

      <div className="flex gap-3">

        <input
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          placeholder="Company Name"
          className="border rounded-lg px-3 py-2 w-80"
        />

        <button
          onClick={search}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>

      </div>

      <PlacementTable
        placements={placements}
      />

    </div>
  );
};

export default CompanyPlacements;
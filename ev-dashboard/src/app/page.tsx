"use client";

import { useEffect, useState } from "react";
import { loadCSV, EVData } from "@/utils/loadCsv";
import {
  getTotalEVs,
  getUniqueMakes,
  getTopStates,
  getYearWiseGrowth,
  getAverageRange,
} from "@/utils/processData";

export default function Home() {
  const [data, setData] = useState<EVData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCSV("/data/Electric_Vehicle_Population_Data.csv")
      .then((csvData) => {
        setData(csvData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("CSV Load Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  const totalEVs = getTotalEVs(data);
  const uniqueMakes = getUniqueMakes(data);
  const topStates = getTopStates(data);
  const yearGrowth = getYearWiseGrowth(data);
  const avgRange = getAverageRange(data);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">EV Analytics Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow">
          <p className="text-lg font-semibold">Total EVs</p>
          <p className="text-2xl text-green-600">{totalEVs}</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <p className="text-lg font-semibold">Unique Makes</p>
          <p className="text-2xl text-blue-600">{uniqueMakes.length}</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <p className="text-lg font-semibold">Avg Range</p>
          <p className="text-2xl text-purple-600">{avgRange} km</p>
        </div>
      </div>
    </main>
  );
}

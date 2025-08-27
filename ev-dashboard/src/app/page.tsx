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
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import EVGrowthChart from "@/components/Charts/EVGrowthChart";
import TopMakesChart from "@/components/Charts/TopMakesChart";
import TopStatesChart from "@/components/Charts/TopStatesChart";
import RangeDistributionChart from "@/components/Charts/RangeDistributionChart";

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
  const avgRange = getAverageRange(data);

  const topStates = getTopStates(data).map(([state, count]) => ({ state, count }));
  const topMakes = Object.entries(
    data.reduce((acc, ev) => {
      acc[ev.Make] = (acc[ev.Make] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([make, count]) => ({ make, count }));

  const yearGrowth = getYearWiseGrowth(data);
  const rangeDistribution = Object.entries(
    data.reduce((acc, ev) => {
      const range = Math.floor(ev["Electric Range"] / 50) * 50; // group ranges
      acc[`${range}-${range + 49}`] = (acc[`${range}-${range + 49}`] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([range, count]) => ({ range, count }));

  return (
    <main className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Header />
      <SummaryCards totalEVs={totalEVs} uniqueMakes={uniqueMakes.length} avgRange={avgRange} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EVGrowthChart data={yearGrowth} />
        <TopMakesChart data={topMakes} />
        <TopStatesChart data={topStates} />
        <RangeDistributionChart data={rangeDistribution} />
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { loadCSV } from "@/utils/loadCsv";
import { EVData } from "@/types/EVData";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import FilterBar from "@/components/FilterBar";
import DataTable from "@/components/DataTable";
import EVGrowthChart from "@/components/Charts/EVGrowthChart";
import TopMakesChart from "@/components/Charts/TopMakesChart";
import TopStatesChart from "@/components/Charts/TopStatesChart";
import RangeDistributionChart from "@/components/Charts/RangeDistributionChart";
import { useFilterState } from "@/utils/useFilteredData";
import {
  // reuse helpers from processData or compute here
} from "@/utils/processData";

export default function HomePage() {
  const [rawData, setRawData] = useState<EVData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCSV("/data/Electric_Vehicle_Population_Data.csv")
      .then((d) => {
        setRawData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const {
    filtered,
    selectedState,
    selectedMake,
    selectedYear,
    search,
    setSelectedState,
    setSelectedMake,
    setSelectedYear,
    setSearch,
    resetFilters,
    possibleStates,
    possibleMakes,
    possibleYears,
  } = useFilterState(rawData);

  // Derived metrics from filtered data (memoized)
  const totalEVs = useMemo(() => filtered.length, [filtered]);
  const uniqueMakesCount = useMemo(
    () => new Set(filtered.map((r) => r.Make)).size,
    [filtered]
  );
  const avgRange = useMemo(() => {
    if (!filtered.length) return 0;
    const total = filtered.reduce((s, r) => s + (Number(r["Electric Range"]) || 0), 0);
    return Math.round(total / filtered.length);
  }, [filtered]);

  // Top states for TopStatesChart
  const topStates = useMemo(() => {
    const map = filtered.reduce<Record<string, number>>((acc, r) => {
      if (!r.State) return acc;
      acc[r.State] = (acc[r.State] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([state, count]) => ({ state, count }));
  }, [filtered]);

  // Top makes for TopMakesChart
  const topMakes = useMemo(() => {
    const map = filtered.reduce<Record<string, number>>((acc, r) => {
      if (!r.Make) return acc;
      acc[r.Make] = (acc[r.Make] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([make, count]) => ({ make, count }));
  }, [filtered]);

  // Year growth for EVGrowthChart
  const yearGrowth = useMemo(() => {
    const map = filtered.reduce<Record<number, number>>((acc, r) => {
      const y = Number(r["Model Year"]);
      if (!y) return acc;
      acc[y] = (acc[y] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map)
      .map(([year, count]) => ({ year: Number(year), count }))
      .sort((a, b) => a.year - b.year);
  }, [filtered]);

  // Range distribution for RangeDistributionChart
  const rangeDistribution = useMemo(() => {
    const map = filtered.reduce<Record<string, number>>((acc, r) => {
      const range = Math.floor(Number(r["Electric Range"]) / 50) * 50;
      const key = `${range}-${range + 49}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map).map(([range, count]) => ({ range, count }));
  }, [filtered]);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <main className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Header />
      <FilterBar
        states={possibleStates}
        years={possibleYears}
        makes={possibleMakes}
        selectedState={selectedState}
        selectedMake={selectedMake}
        selectedYear={selectedYear}
        search={search}
        onStateChange={setSelectedState}
        onMakeChange={setSelectedMake}
        onYearChange={setSelectedYear}
        onSearchChange={setSearch}
        onReset={resetFilters}
      />

      <SummaryCards totalEVs={totalEVs} uniqueMakes={uniqueMakesCount} avgRange={avgRange} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EVGrowthChart data={yearGrowth} />
        <TopMakesChart data={topMakes} />
        <TopStatesChart data={topStates} />
        <RangeDistributionChart data={rangeDistribution} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Dataset</h2>
        <DataTable data={filtered} />
      </div>
    </main>
  );
}

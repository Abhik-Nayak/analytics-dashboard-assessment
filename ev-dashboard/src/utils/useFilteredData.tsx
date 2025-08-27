"use client";

import { useMemo, useState } from "react";
import { EVData } from "@/types/EVData";

export function useFilterState(initialData: EVData[]) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];

    return initialData.filter((row) => {
      if (selectedState && row.State !== selectedState) return false;
      if (selectedMake && row.Make !== selectedMake) return false;
      if (selectedYear && Number(row["Model Year"]) !== selectedYear) return false;
      if (search) {
        const q = search.toLowerCase();
        const model = (row.Model || "").toString().toLowerCase();
        const make = (row.Make || "").toString().toLowerCase();
        const state = (row.State || "").toString().toLowerCase();
        if (!model.includes(q) && !make.includes(q) && !state.includes(q)) return false;
      }
      return true;
    });
  }, [initialData, selectedState, selectedMake, selectedYear, search]);

  // derived lists for selects (memoized)
  const possibleStates = useMemo(() => {
    const s = Array.from(new Set(initialData.map((d) => d.State).filter(Boolean)));
    return s.sort();
  }, [initialData]);

  const possibleMakes = useMemo(() => {
    const s = Array.from(new Set(initialData.map((d) => d.Make).filter(Boolean)));
    return s.sort();
  }, [initialData]);

  const possibleYears = useMemo(() => {
    const s = Array.from(new Set(initialData.map((d) => Number(d["Model Year"])).filter(Boolean)));
    return s.sort((a, b) => b - a); // newer first
  }, [initialData]);

  const resetFilters = () => {
    setSelectedState(null);
    setSelectedMake(null);
    setSelectedYear(null);
    setSearch("");
  };

  return {
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
  } as const;
}

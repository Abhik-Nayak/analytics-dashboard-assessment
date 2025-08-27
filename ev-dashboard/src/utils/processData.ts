import { EVData } from "./loadCsv";

// Get total EVs
export const getTotalEVs = (data: EVData[]) => data.length;

// Get unique makes
export const getUniqueMakes = (data: EVData[]) => {
  return Array.from(new Set(data.map((ev) => ev.Make)));
};

// Get top 10 states by EV count
export const getTopStates = (data: EVData[]) => {
  const stateCount: Record<string, number> = {};
  data.forEach((ev) => {
    stateCount[ev.State] = (stateCount[ev.State] || 0) + 1;
  });

  return Object.entries(stateCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
};

// Get year-wise EV growth
export const getYearWiseGrowth = (data: EVData[]) => {
  const yearCount: Record<number, number> = {};
  data.forEach((ev) => {
    const year = ev["Model Year"];
    yearCount[year] = (yearCount[year] || 0) + 1;
  });

  return Object.entries(yearCount)
    .map(([year, count]) => ({ year: Number(year), count }))
    .sort((a, b) => a.year - b.year);
};

// Get average electric range
export const getAverageRange = (data: EVData[]) => {
  const total = data.reduce((sum, ev) => sum + (ev["Electric Range"] || 0), 0);
  return Math.round(total / data.length);
};

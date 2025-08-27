"use client";

import React from "react";

interface Props {
  states: string[];
  years: number[];
  makes: string[];
  selectedState: string | null;
  selectedMake: string | null;
  selectedYear: number | null;
  search: string;
  onStateChange: (s: string | null) => void;
  onMakeChange: (m: string | null) => void;
  onYearChange: (y: number | null) => void;
  onSearchChange: (q: string) => void;
  onReset: () => void;
}

export default function FilterBar({
  states,
  years,
  makes,
  selectedState,
  selectedMake,
  selectedYear,
  search,
  onStateChange,
  onMakeChange,
  onYearChange,
  onSearchChange,
  onReset,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
      <div className="flex gap-3 flex-wrap">
        <div>
          <label className="text-sm text-gray-600">State</label>
          <select
            value={selectedState ?? ""}
            onChange={(e) => onStateChange(e.target.value || null)}
            className="block mt-1 border rounded px-3 py-2"
          >
            <option value="">All</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Year</label>
          <select
            value={selectedYear ?? ""}
            onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
            className="block mt-1 border rounded px-3 py-2"
          >
            <option value="">All</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Make</label>
          <select
            value={selectedMake ?? ""}
            onChange={(e) => onMakeChange(e.target.value || null)}
            className="block mt-1 border rounded px-3 py-2"
          >
            <option value="">All</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div>
          <label className="text-sm text-gray-600">Search (model)</label>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search model..."
            className="mt-1 border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={onReset}
          className="mt-1 bg-gray-100 border px-4 py-2 rounded hover:bg-gray-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

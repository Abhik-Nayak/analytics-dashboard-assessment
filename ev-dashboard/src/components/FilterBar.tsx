"use client";

import React from "react";
import styles from "../styles/FilterBar.module.scss";

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
    <div className={styles.filterBar}>
      {/* Dropdown Filters */}
      <div className={styles.dropdownGroup}>
        <div className={styles.field}>
          <label className={styles.label}>State</label>
          <select
            value={selectedState ?? ""}
            onChange={(e) => onStateChange(e.target.value || null)}
            className={styles.select}
          >
            <option value="">All</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Year</label>
          <select
            value={selectedYear ?? ""}
            onChange={(e) =>
              onYearChange(e.target.value ? Number(e.target.value) : null)
            }
            className={styles.select}
          >
            <option value="">All</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Make</label>
          <select
            value={selectedMake ?? ""}
            onChange={(e) => onMakeChange(e.target.value || null)}
            className={styles.select}
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

      {/* Search + Reset */}
      <div className={styles.searchGroup}>
        <div className={styles.field}>
          <label className={styles.label}>Search (model)</label>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search model..."
            className={styles.input}
          />
        </div>

        <button onClick={onReset} className={styles.resetButton}>
          Reset
        </button>
      </div>
    </div>
  );
}

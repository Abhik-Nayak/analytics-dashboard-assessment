"use client";

import React, { useMemo, useState } from "react";
import { EVData } from "@/types/EVData";
import styles from "../styles/DataTable.module.scss";

interface Props {
  data: EVData[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

type SortKey = keyof EVData | null;
type SortDirection = "asc" | "desc" | null;

export default function DataTable({
  data,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
}: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const columns: Array<{ key: keyof EVData; label: string }> = [
    { key: "Make", label: "Make" },
    { key: "Model", label: "Model" },
    { key: "Model Year", label: "Year" },
    { key: "State", label: "State" },
    { key: "Electric Range", label: "Range (km)" },
  ];

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    const sortedData = [...data].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return sortedData;
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const toggleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      } else setSortDir("asc");
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => toggleSort(col.key)}
                  className={styles.headerCell}
                >
                  <div className={styles.headerContent}>
                    <span>{col.label}</span>
                    {sortKey === col.key && sortDir && (
                      <span className={styles.sortIcon}>
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={i} className={styles.row}>
                <td className={styles.cell}>{row.Make}</td>
                <td className={styles.cell}>{row.Model}</td>
                <td className={styles.cell}>{row["Model Year"]}</td>
                <td className={styles.cell}>{row.State}</td>
                <td className={styles.cell}>{row["Electric Range"]}</td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className={styles.noData}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationContainer}>
        <div className={styles.rowsPerPage}>
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className={styles.pageSizeSelect}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.paginationControls}>
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className={styles.pageButton}
          >
            {"<<"}
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={styles.pageButton}
          >
            Prev
          </button>

          <span className={styles.pageIndicator}>
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={styles.pageButton}
          >
            Next
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className={styles.pageButton}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

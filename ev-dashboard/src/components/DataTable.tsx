"use client";

import React, { useMemo, useState } from "react";
import { EVData } from "@/types/EVData";

interface Props {
  data: EVData[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

type SortKey = keyof EVData | null;
type SortDirection = "asc" | "desc" | null;

export default function DataTable({ data, pageSizeOptions = [10, 25, 50], defaultPageSize = 10 }: Props) {
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
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                  onClick={() => toggleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {sortKey === col.key && sortDir && (
                      <span className="text-xs text-gray-500">{sortDir === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{row.Make}</td>
                <td className="px-4 py-2">{row.Model}</td>
                <td className="px-4 py-2">{row["Model Year"]}</td>
                <td className="px-4 py-2">{row.State}</td>
                <td className="px-4 py-2">{row["Electric Range"]}</td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 ml-2"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1 border rounded">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

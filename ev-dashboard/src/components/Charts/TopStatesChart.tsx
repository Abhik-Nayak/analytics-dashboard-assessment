"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  data: { state: string; count: number }[];
}

export default function TopStatesChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-lg font-bold mb-4">Top States by EV Count</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="state" type="category" />
          <Tooltip />
          <Bar dataKey="count" fill="#f97316" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

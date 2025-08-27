interface SummaryProps {
  totalEVs: number;
  uniqueMakes: number;
  avgRange: number;
}

export default function SummaryCards({ totalEVs, uniqueMakes, avgRange }: SummaryProps) {
  const cards = [
    { label: "Total EVs", value: totalEVs, color: "text-green-600" },
    { label: "Unique Makes", value: uniqueMakes, color: "text-blue-600" },
    { label: "Avg Range (km)", value: avgRange, color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white shadow p-6 rounded-xl border hover:shadow-lg transition"
        >
          <p className="text-gray-500 font-medium">{card.label}</p>
          <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

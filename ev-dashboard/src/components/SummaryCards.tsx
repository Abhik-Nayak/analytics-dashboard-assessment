import styles from "../styles/SummaryCards.module.scss";

interface SummaryProps {
  totalEVs: number;
  uniqueMakes: number;
  avgRange: number;
}

export default function SummaryCards({ totalEVs, uniqueMakes, avgRange }: SummaryProps) {
  const cards = [
    { label: "Total EVs", value: totalEVs, color: styles.green },
    { label: "Unique Makes", value: uniqueMakes, color: styles.blue },
    { label: "Avg Range (km)", value: avgRange, color: styles.purple },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card, idx) => (
        <div key={idx} className={styles.card}>
          <p className={styles.label}>{card.label}</p>
          <p className={`${styles.value} ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

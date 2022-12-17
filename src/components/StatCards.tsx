import React, { useState } from "react";
import { Database } from "sql.js";
import styles from "../../styles/Stats.module.css";

type StatProps = {
  db: Database;
};

type Props = {
  stats: React.FC<StatProps>[];
  db: Database;
};

export default function StatCards({ stats, db }: Props) {
  const [statIndex, setStatIndex] = useState(0);

  const SelectedStat = stats[statIndex];

  return (
    <div className={styles.cardBackground}>
      <div className={styles.card}>
        <SelectedStat db={db} />
      </div>
      {/* Insert little dots here to change slider */}
    </div>
  );
}

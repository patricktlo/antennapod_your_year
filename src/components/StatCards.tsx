import React, { useState } from "react";
import { Database } from "sql.js";
import styles from "../../styles/Stats.module.css";
import Circle from "./Circle";

type StatProps = {
  db: Database;
};

type Props = {
  stats: React.FC<StatProps>[];
  db: Database;
};

export default function StatCards({ stats, db }: Props) {
  const [statIndex, setStatIndex] = useState(0);

  const nextStat = () => {
    if (statIndex === stats.length - 1) setStatIndex(0);
    else setStatIndex(statIndex + 1);
  };

  const previousStat = () => {
    if (statIndex === 0) setStatIndex(stats.length - 1);
    else setStatIndex(statIndex - 1);
  };

  const SelectedStat = stats[statIndex];

  return (
    <div className={styles.cardBackground}>
      <div className={styles.card}>
        <SelectedStat db={db} />
      </div>
      <div className={styles.slider}>
        <button onClick={previousStat}>&lt;</button>
        <span> </span>
        {stats.map((stat, index) => {
          if (stat === stats[statIndex])
            return <Circle color="#1893f7" key={index} />;
          return <Circle color="white" key={index} />;
        })}
        <span> </span>
        <button onClick={nextStat}>&gt;</button>
      </div>
    </div>
  );
}

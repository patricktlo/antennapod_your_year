import { useState } from "react";
import styles from "../styles/Landing.module.css";
import DatabaseReader from "../src/components/DatabaseReader";
import { Database } from "sql.js";
import TopFivePodcasts from "../src/components/TopFivePodcasts";
import TotalPlaytime from "../src/components/TotalPlaytime";
import TopMonths from "../src/components/TopMonths";
import TopDaysOfWeek from "../src/components/TopDaysofWeek";
import UseDemoDatabase from "../src/components/UseDemoDatabase";
import Link from "next/link";
import StatCards from "../src/components/StatCards";

export default function Home() {
  const [db, setDb] = useState<Database>();

  if (!db) {
    return (
      <div className={styles.landing}>
        <h1>Your year in Antennapod</h1>
        <div className={styles.selectDb}>
          <DatabaseReader setDb={setDb} />
          <UseDemoDatabase setDb={setDb} />
        </div>
        <footer>
          <Link href="/howto">How to use</Link>
        </footer>
      </div>
    );
  }

  return (
    <StatCards
      stats={[TotalPlaytime, TopFivePodcasts, TopMonths, TopDaysOfWeek]}
      db={db}
    />
  );
}

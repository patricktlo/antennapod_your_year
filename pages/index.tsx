import { useState } from "react";
import styles from "../styles/Home.module.css";
import DatabaseReader from "../src/components/DatabaseReader";
import { Database } from "sql.js";
import TopFivePodcasts from "../src/components/TopFivePodcasts";
import TotalPlaytime from "../src/components/TotalPlaytime";
import TopMonths from "../src/components/TopMonths";
import TopDaysOfWeek from "../src/components/TopDaysofWeek";

export default function Home() {
  const [db, setDb] = useState<Database>();

  if (!db) {
    return (
      <div>
        <DatabaseReader setDb={setDb} />
      </div>
    );
  }

  return (
    <>
      <TotalPlaytime db={db} />
      <TopFivePodcasts db={db} />
      <TopMonths db={db} />
      <TopDaysOfWeek db={db} />
    </>
  );
}

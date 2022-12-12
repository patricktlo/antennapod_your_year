import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import DatabaseReader from "../src/DatabaseReader";
import initSqlJs, { Database } from "sql.js";

export default function Home() {
  const [db, setDb] = useState<Database>();

  if (db) {
    const stmt = db.prepare("SELECT * FROM FeedMedia;");
    stmt.step();
    stmt.step();
    console.log(stmt.getAsObject());
  }

  return (
    <div className={styles.container}>
      <DatabaseReader setDb={setDb} />
    </div>
  );
}

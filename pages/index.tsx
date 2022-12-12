import { ChangeEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import DatabaseReader from "../src/DatabaseReader";
// import initSqlJs from 'sql.js'

export default function Home() {
  const [file, setFile] = useState<File>();

  return (
    <div className={styles.container}>
      <DatabaseReader setFile={setFile} />
    </div>
  );
}

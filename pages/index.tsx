import { useState } from "react";
import styles from "../styles/Home.module.css";
import DatabaseReader from "../src/DatabaseReader";
import { Database } from "sql.js";

export default function Home() {
  const [db, setDb] = useState<Database>();

  let topFive = [];
  if (db) {
    const stmt =
      db.prepare(` SELECT Feeds.title, SUM(played_duration) FROM FeedMedia INNER JOIN FeedItems
      ON FeedMedia.feeditem = FeedItems.id
      INNER JOIN Feeds
      ON FeedItems.feed = Feeds.id
    WHERE playback_completion_date > $start
    GROUP BY FeedItems.feed
    ORDER BY SUM(played_duration) DESC
    LIMIT 5
    `);

    stmt.bind({ $start: DateToUnixEpoch(new Date("2022-01-01T00:00:00")) });
    while (stmt.step()) {
      topFive.push(stmt.getAsObject());
    }
    console.log(topFive);
  }

  if (!db) {
    return (
      <div className={styles.container}>
        <DatabaseReader setDb={setDb} />
      </div>
    );
  }

  return (
    <>
      <p>db loaded</p>
      <pre>{JSON.stringify(topFive)}</pre>
    </>
  );
}

const DateToUnixEpoch = (date: Date) => {
  return Math.floor(date / 1000);
};

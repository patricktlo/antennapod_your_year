import styles from "../../styles/Stats.module.css";
import { Database } from "sql.js";

type Props = {
  db: Database;
};

export default function TotalPlaytime({ db }: Props) {
  const stmt = db.prepare(`
    SELECT SUM(played_duration)/(60*60*1000) as playtime FROM FeedMedia INNER JOIN FeedItems
        ON FeedMedia.feeditem = FeedItems.id
        INNER JOIN Feeds
        ON FeedItems.feed = Feeds.id
    WHERE last_played_time BETWEEN $start and $end
    `);

  stmt.bind({
    $start: new Date("2022-01-01T00:00:00").getTime(),
    $end: new Date("2023-01-01T00:00:00").getTime(),
  });
  stmt.step();
  const totalTime = stmt.getAsObject().playtime as number;

  return (
    <>
      <h1>Total listening time</h1>
      <div className={styles.cardBody}>
        <h2>In 2022, you listened to podcasts for {totalTime} hours!</h2>
        <p>
          If you were riding a bike the entire time at 20 km/h, you
          would&apos;ve ridden for {totalTime * 20} km!
        </p>
      </div>
    </>
  );
}

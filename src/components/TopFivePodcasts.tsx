import styles from "../../styles/Stats.module.css";
import { Database } from "sql.js";

type Props = {
  db: Database;
};

export default function TopFivePodcasts({ db }: Props) {
  let topFive = [];
  const stmt = db.prepare(`
    SELECT Feeds.title, SUM(played_duration)/(60*60*1000) as playtime, Feeds.id FROM FeedMedia INNER JOIN FeedItems
    ON FeedMedia.feeditem = FeedItems.id
    INNER JOIN Feeds
    ON FeedItems.feed = Feeds.id
    WHERE last_played_time > $start
    GROUP BY FeedItems.feed
    ORDER BY SUM(played_duration) DESC
    LIMIT 5
`);

  stmt.bind({ $start: new Date("2022-01-01T00:00:00").getTime() });
  while (stmt.step()) {
    topFive.push(stmt.getAsObject());
  }

  return (
    <>
      <h1>Your top 5 podcasts this year</h1>
      <div className={styles.cardBody}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Playtime (hours)</th>
            </tr>
          </thead>
          <tbody>
            {topFive.map(({ title, playtime, id }) => (
              <tr key={title as string}>
                <td>{title}</td>
                <td>{playtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

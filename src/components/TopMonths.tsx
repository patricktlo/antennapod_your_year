import styles from "../../styles/Home.module.css";
import { Database } from "sql.js";

type Props = {
  db: Database;
};

export default function TopMonths({ db }: Props) {
  let months = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const stmt = db.prepare(`
    SELECT SUM(played_duration)/(60*60*1000) as playtime FROM FeedMedia INNER JOIN FeedItems
        ON FeedMedia.feeditem = FeedItems.id
        INNER JOIN Feeds
        ON FeedItems.feed = Feeds.id
    WHERE last_played_time BETWEEN $start AND $end
  `);

  Object.entries(months).forEach(([month, sum], index) => {
    months[month] = stmt.getAsObject(getStartAndEndOfMonth(index + 1))
      .playtime as number;
  });

  return (
    <div className={styles.topfive}>
      <h1>Top months by activity</h1>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Playtime (hours)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(months).map(([month, playtime]) => (
            <tr key={month}>
              <th>{month}</th>
              <th>{playtime}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const getStartAndEndOfMonth = (month: number) => {
  // Month starting from 1 (january) through 12 (december)
  let endTimestamp =
    new Date(
      `2022-${(month + 1).toString().padStart(2, "0")}-01T00:00:00`
    ).getTime() - 1;

  // If december, set end as start of january of the other year
  if (month === 12) {
    endTimestamp = new Date(`2023-01-01T00:00:00`).getTime() - 1;
  }

  return {
    $start: new Date(
      `2022-${month.toString().padStart(2, "0")}-01T00:00:00`
    ).getTime(),
    $end: endTimestamp,
  };
};

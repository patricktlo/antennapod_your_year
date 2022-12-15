import styles from "../../styles/Home.module.css";
import { Database } from "sql.js";

type Props = {
  db: Database;
};

export default function TopDaysOfWeek({ db }: Props) {
  let daysOfWeek = {
    0: 0, // Sunday
    1: 0, // Monday
    2: 0, // Tueday
    3: 0, // Wednesday
    4: 0, // Thursday
    5: 0, // Friday
    6: 0, // Saturday
  };
  const dayOfWeekToLabel = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const stmt = db.prepare(`
    SELECT SUM(played_duration)/(1000) as playtime FROM FeedMedia INNER JOIN FeedItems
        ON FeedMedia.feeditem = FeedItems.id
        INNER JOIN Feeds
        ON FeedItems.feed = Feeds.id
    WHERE last_played_time BETWEEN $start AND $end
  `);

  // Loop through all days and sum it to their respective weekdays
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 31; day++) {
      if (DayDoesntExistInMonth(month, day)) continue;

      const [dayStart, dayEnd] = getStartAndEndOfDay(2022, month, day);

      daysOfWeek[dayStart.getDay() as keyof typeof daysOfWeek] +=
        stmt.getAsObject({
          $start: dayStart.getTime(),
          $end: dayEnd.getTime(),
        }).playtime as unknown as number;
    }
  }

  return (
    <div className={styles.center}>
      <h1>Top weekdays</h1>
      <table>
        <thead>
          <tr>
            <th>Day of the week</th>
            <th>Playtime (hours)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(daysOfWeek).map(([day, playtime]) => (
            <tr key={day}>
              <th>
                {
                  dayOfWeekToLabel[
                    day as unknown as keyof typeof dayOfWeekToLabel
                  ]
                }
              </th>
              <th>{(playtime / 3600).toFixed(0)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const getStartAndEndOfDay = (year: number, month: number, day: number) => {
  return [
    new Date(
      `${year.toString()}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}T00:00:00`
    ),
    new Date(
      `${year.toString()}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}T23:59:59`
    ),
  ];
};

const DayDoesntExistInMonth = (month: number, day: number) => {
  return (
    (month === 2 && day > 28) || ([4, 6, 9, 11].includes(month) && day > 30)
  );
};

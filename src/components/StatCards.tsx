import React from "react";
import { Database } from "sql.js";

type StatProps = {
  db: Database;
};

type Props = {
  stats: React.FC<StatProps>[];
  db: Database;
};

// type StatComponent = {
//     ({ db }: {db: Database}) => Element
// }

export default function StatCards({ stats, db }: Props) {
  return (
    <>
      {stats.map((Component, index) => (
        <Component db={db} key={index} />
      ))}
    </>
  );
}

import { ChangeEvent, useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";

type Props = {
  setDb: (a: Database) => void;
};

export default function UseDemoDatabase({ setDb }: Props) {
  const [file, setFile] = useState<ArrayBuffer>();

  useEffect(() => {
    if (!file) return;

    initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    }).then((SQL) => {
      setDb(new SQL.Database(new Uint8Array(file)));
    });
  }, [file, setDb]);

  const handleFileSelect = async () => {
    const data = await fetch("./data/demodb.db");

    data.arrayBuffer().then((arrayBuffer) => {
      setFile(arrayBuffer);
    });
  };

  return (
    <>
      <label htmlFor="dbDemo">Use demo database</label>
      <button id="dbDemo" name="dbDemo" onClick={handleFileSelect} />
    </>
  );
}

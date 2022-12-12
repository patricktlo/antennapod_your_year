import { ChangeEvent, useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";

type Props = {
  setFile: (a: File) => void;
};

export default function DatabaseReader({ setFile }: Props) {
  const [Db, setDb] = useState<Database>();

  // useEffect(() => {
  //   initSqlJs({
  //     locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  //   }).then((SQL) => setDb(new SQL.Database()));
  // }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    const r = new FileReader();
    r.onload = function () {
      const uInts = new Uint8Array(r.result);

      initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
      }).then((SQL) => {
        setDb(new SQL.Database(uInts));
      });
    };
    r.readAsArrayBuffer(e.target.files[0]);
  };

  if (Db) {
    // console.log(Db);
    const stmt = Db.prepare("SELECT * FROM FeedMedia;");
    stmt.step();
    stmt.step();
    console.log(stmt.getAsObject());
  }

  return (
    <>
      <label htmlFor="dbUpload">Put db file here</label>
      <input
        type="file"
        id="dbUpload"
        name="dbUpload"
        onChange={handleFileChange}
      />
    </>
  );
}

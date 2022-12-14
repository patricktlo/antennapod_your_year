import { ChangeEvent, useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";

type Props = {
  setDb: (a: Database) => void;
};

export default function DatabaseReader({ setDb }: Props) {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!file) return;

    const r = new FileReader();
    r.onload = function () {
      const uInts = new Uint8Array(r.result as ArrayBuffer);

      initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
      }).then((SQL) => {
        setDb(new SQL.Database(uInts));
      });
    };

    r.readAsArrayBuffer(file);
  }, [file, setDb]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

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

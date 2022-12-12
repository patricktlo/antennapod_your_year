import { ChangeEvent, useState } from "react";

type Props = {
  setFile: (a: File) => void;
};

export default function DatabaseReader({ setFile }: Props) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
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

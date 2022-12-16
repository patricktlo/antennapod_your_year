import Link from "next/link";
import React from "react";
import styles from "../styles/Landing.module.css";

export default function Howto() {
  return (
    <div className={styles.howto}>
      <p>
        In order to use this app, you need to export the database from
        AntennaPod:
        <br />
        Settings &gt; Storage &gt; Import/Export &gt; Database export to save
        your .db file
        <br />
        upload it using the "Upload database" button on the main screen. Don't
        worry, your database file never leaves the browser!
      </p>
      <button>
        <Link href="/" className={styles.link}>
          Back to main screen
        </Link>
      </button>
    </div>
  );
}

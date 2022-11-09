import { Request, Response } from "express";
import sqlite3 from "sqlite3";

import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { create } from "domain";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__filename);
// console.log(__dirname);

const paths = await path.resolve(__dirname, "../../../lib/db/quiz.db");
console.log(paths);

export default async (req: Request, res: Response) => {
  const sqlite = sqlite3.verbose();

  const db = new sqlite.Database(
    "../../db/quiz.db",
    sqlite.OPEN_READWRITE,
    (err: any) => {
      if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        console.log("tttttt")
        return;
      } else if (err) return console.error(err);
    }
  );

  function createDatabase() {
    const db = new sqlite3.Database("../../db/quiz.db", (err) => {
      if (err) return console.error(err);
    });

    const sql = `CREATE TABLE quiz(ID INTEGER PRIMARY KEY, appId, createdAt)`;
    db.run(sql);
    console.log("creating")

  }

  try {
    const { appId, time } = req.body;
    const sql = "INSERT INTO quiz(appId, time) VALUES (? , ?)";

    db.run(sql, [appId, time], (err: any) => {
      if (err) {
        res.json({ status: 300, success: false, error: err });
      }

      console.log("successful ", appId, time);
    });

    console.log(req.body.appId);
    res.json({ status: 200, success: true });
  } catch (error) {
    res.json({
      status: 400,
      success: false,
    });
  }
};
// copyfiles -u 2 src/db/*.db lib/db &&
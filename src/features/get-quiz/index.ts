import { Request, Response } from "express";
import sqlite3 from "sqlite3";

export default async (_req: Request, res: Response) => {
  const db = new sqlite3.Database(
    "../../db/quiz.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the chinook database.");
    }
  );

  const sql = "SELECT * FROM quiz";

  try {
    db.all(sql, [], (err, rows) => {
      if (err) res.json({ status: 300, success: false, error: err });

      console.log("wrok");
      res.json({ status: 200, success: true, data: rows });
    });
  } catch (error) {
    res.json({
      status: 400,
      success: false,
    });
  }
};

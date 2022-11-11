import { Request, Response } from "express";
import sqlite3 from "sqlite3";
import path from "path";

export default async (_req: Request, res: Response) => {
  const dbPath = path.resolve("lib", "db/quiz.db");

  const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE,
    (err: any) => {
      try {
        if (err) {
          throw new Error(err.code);
        }

        const sql = "SELECT * FROM quiz";
        db.all(sql, [], (err, rows) => {
          if (err) res.json({ status: 300, success: false, error: err });

          if (rows.length < 1)
            res.json({ status: 300, success: false, error: "no match" });

          res.json({ status: 200, success: true, data: rows });
        });
      } catch (error) {
        res.json({
          status: 400,
          success: false,
        });
      }
    }
  );
};

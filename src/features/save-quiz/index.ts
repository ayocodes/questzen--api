import { Request, Response } from "express";
import path from "path";
import sqlite3 from "sqlite3";
import { createDatabase } from "../../db/create-db.js";

export default async (req: Request, res: Response) => {
  const { appId, createdAt } = req.body;
  const dbPath = path.resolve("lib", "db/quiz.db");
  let state = "save";

  const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE,
    (err: any) => {
      try {
        if (err) {
          if (err.code == "SQLITE_CANTOPEN") {
            state = "create";
            console.log("switching state");
          } else {
            db.close();
            throw new Error(err.code);
          }
        }

        switch (state) {
          case "create":
            createDatabase();
            db.close();
            break;

          case "save":
            const sql = "INSERT INTO quiz(appId, createdAt) VALUES (? , ?)";

            db.serialize(() => {
              const x = db.prepare(sql);
              x.run(appId, createdAt);
              x.finalize();
            });
            db.close();
            break;

          default:
            db.close();
            break;
        }

        res.json({ status: 200, success: true });
      } catch (error) {
        res.json({
          status: 400,
          success: false,
        });
      }
    }
  );
};

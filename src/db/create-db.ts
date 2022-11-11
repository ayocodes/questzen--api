import path from "path";
import sqlite3 from "sqlite3";

export function createDatabase() {
  const dbPath = path.resolve("lib", "db/quiz.db");

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) return console.error(err);

    const sql = `CREATE TABLE quiz(appId, createdAt)`;
    db.run(sql);
    db.close();
    console.log("Database created.");
  });
}

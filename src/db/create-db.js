import sqlite3 from "sqlite3";


const db = new sqlite3.Database(
    "./quiz.db",
    (err) => {
        if (err) return console.error(err);
    }
);

const sql = `CREATE TABLE quiz(ID INTEGER PRIMARY KEY, appId, createdAt)`;
db.run(sql);

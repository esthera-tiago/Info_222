const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../../blog.db"));


db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    title     TEXT    NOT NULL,
    content   TEXT    NOT NULL,
    author    TEXT    NOT NULL,
    date      TEXT    NOT NULL DEFAULT (date('now')),
    category  TEXT    NOT NULL,
    tags      TEXT    NOT NULL DEFAULT '[]'
  )
`);

module.exports = db;
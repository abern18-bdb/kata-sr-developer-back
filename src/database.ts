import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DATABASE_FILE = './tasks.db';

export const initDatabase = async () => {
  const db = await open({
    filename: DATABASE_FILE,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status BOOLEAN NOT NULL DEFAULT 0,
      user_name TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
};

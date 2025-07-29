import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

const DB_NAME = "britify.db";
let instance: SQLiteDatabase | null = null;

export async function initializeDB() {
  if (!instance) {
    instance = await openDatabaseAsync(DB_NAME);

    await instance.execAsync(`
      CREATE TABLE IF NOT EXISTS favourites (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        type TEXT CHECK (type IN ('song', 'album', 'artist', 'playlist', 'mix')),
        perma_url TEXT NOT NULL,
        image TEXT
      );
    `);

    await instance.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_media_type ON favourites(type);
    `);
  }
}

export function getFavouritesDB() {
  if (!instance)
    initializeDB().then(() => {
      return instance;
    });
    
  return instance;
}

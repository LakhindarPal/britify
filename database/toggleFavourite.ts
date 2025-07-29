import type { FavouriteItem } from "structures";
import { getFavouritesDB } from "./favouritesDB";

export async function toggleFavourite(
  item: FavouriteItem,
  setFavouriteUI
): Promise<boolean> {
  const db = await getFavouritesDB();
  const { id, title, subtitle, type, perma_url, image } = item;

  const existing = await db.getFirstAsync(
    "SELECT id FROM favourites WHERE id = ?",
    [id]
  );

  if (existing) {
    await db.runAsync("DELETE FROM favourites WHERE id = ?", [id]);
    setFavouriteUI(false);
    return false;
  } else {
    await db.runAsync(
      "INSERT INTO favourites (id, title, subtitle,  type, perma_url, image) VALUES (?, ?, ?, ?, ?, ?)",
      [id, title, subtitle!, type, perma_url, image]
    );
    setFavouriteUI(true);
    return true;
  }
}

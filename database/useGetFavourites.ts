import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import type { FavouriteItem } from "structures";
import { getFavouritesDB } from "./favouritesDB";

export const useGetFavourites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<FavouriteItem[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const db = await getFavouritesDB();
      const results = (await db.getAllAsync(
        `SELECT * FROM favourites`
      )) as FavouriteItem[];
      setItems(results);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  return { items, isLoading };
};

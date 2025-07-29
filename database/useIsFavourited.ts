import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { getFavouritesDB } from "./favouritesDB";

export const useIsFavourited = (itemId: string) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const checkStatus = useCallback(async () => {
    const db = await getFavouritesDB();
    const result = await db.getFirstAsync(
      "SELECT id FROM favourites WHERE id = ?",
      [itemId]
    );
    setIsFavourite(!!result);
  }, [itemId]);

  useFocusEffect(
    useCallback(() => {
      checkStatus();
    }, [checkStatus])
  );

  return [isFavourite, setIsFavourite];
};

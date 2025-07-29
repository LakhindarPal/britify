import { sources } from "constants/Api";
import type { AlbumSearch } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { q: string; p: number }];

export async function getSearchAlbums([_, params]: Props): Promise<AlbumSearch> {
  const resp = await fetch(buildApi(sources.album_search, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch search data");

  const data: AlbumSearch = await resp.json();

  if (!data.results.length)
    throw new Error("No album results found for this search query");

  return data;
}

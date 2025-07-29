import { sources } from "constants/Api";
import type { AutoSearch } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getSearchAll([_, query]: [string, string]): Promise<AutoSearch> {
  const resp = await fetch(buildApi(sources.auto_search, { query }), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch search data");

  const data: AutoSearch = await resp.json();

  if (
    !data.songs.data.length &&
    !data.albums.data.length &&
    !data.playlists.data.length &&
    !data.artists.data.length &&
    !data.topquery.data.length
  )
    throw new Error("No results found for this search query");

  return data;
}

import { sources } from "constants/Api";
import type { ArtistSearch } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { q: string; p: number }];

export async function getSearchArtists([_, params]: Props): Promise<ArtistSearch> {
  const resp = await fetch(buildApi(sources.artist_search, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch search data");

  const data: ArtistSearch = await resp.json();

  if (!data.results.length)
    throw new Error("No artist results found for this search query");

  return data;
}

import { sources } from "constants/Api";
import type { ArtistOverview } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getArtistOverview([_, token, filter]: [
  string,
  string,
  string,
]): Promise<ArtistOverview> {
  const params = Object.fromEntries(new URLSearchParams(filter));
  const resp = await fetch(buildApi(sources.artist_overview, { token, ...params }), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch artist data");

  const data = await resp.json();

  return data;
}

import { sources } from "constants/Api";
import type { TopPlaylist } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getFeaturedPlaylists([_, lang]: [string, string]): Promise<
  TopPlaylist[]
> {
  const params = lang === "for you" ? {} : { languages: lang };
  const resp = await fetch(buildApi(sources.featured_playlists, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch featured playlists");

  const { data } = await resp.json();

  return data;
}

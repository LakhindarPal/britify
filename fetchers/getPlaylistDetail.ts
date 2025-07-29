import { sources } from "constants/Api";
import type { PlaylistDetail } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getPlaylistDetail([_, token]: [
  string,
  string,
]): Promise<PlaylistDetail> {
  const resp = await fetch(buildApi(sources.playlist_detail, { token }), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch playlist data");

  const data = await resp.json();

  if (!data.list.length) throw new Error("The playlist has no songs");

  return data;
}

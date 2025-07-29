import { sources } from "constants/Api";
import type { AlbumDetail } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getAlbumDetail([_, token]: [string, string]): Promise<AlbumDetail> {
  const resp = await fetch(buildApi(sources.album_detail, { token }), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch album data");

  const data = await resp.json();

  if (!data.list.length) throw new Error("The album has no songs");

  return data;
}

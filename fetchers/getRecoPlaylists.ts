import { sources } from "constants/Api";
import type { BasePlaylist } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { listid: string }];
export async function getRecoPlaylists([, params]: Props): Promise<BasePlaylist[]> {
  const resp = await fetch(buildApi(sources.playlist_reco, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch recommended playlists");

  const data = await resp.json();

  if (!data.length) throw new Error("There is no recommended playlists");

  return data;
}

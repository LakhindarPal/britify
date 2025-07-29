import { sources } from "constants/Api";
import type { ListSong } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { pid: string; language: string }];

export async function getRecoSongs([, params]: Props): Promise<ListSong[]> {
  const resp = await fetch(buildApi(sources.song_reco, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch recommended songs");

  const data = await resp.json();

  if (!data.length) throw new Error("There is no recommended songs");

  return data;
}

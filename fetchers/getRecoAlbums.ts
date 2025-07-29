import { sources } from "constants/Api";
import type { BaseAlbum } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { albumid: string }];

export async function getRecoAlbums([, params]: Props): Promise<BaseAlbum[]> {
  const resp = await fetch(buildApi(sources.album_reco, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch recommended albums");

  const data = await resp.json();

  if (!data.length) throw new Error("There is no recommended albums");

  return data;
}

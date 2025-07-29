import { sources } from "constants/Api";
import type { BaseAlbum, Language } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { album_year: string; album_lang: Language }];

export async function getYearAlbums([, params]: Props): Promise<BaseAlbum[]> {
  const resp = await fetch(buildApi(sources.year_albums, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch same year albums");

  const data = await resp.json();

  if (!data.length) throw new Error("There is no more albums in this year");

  return data;
}

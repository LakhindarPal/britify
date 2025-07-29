import { sources } from "constants/Api";
import type { newItem } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getLatestData([_, lang]: [string, string]): Promise<newItem[]> {
  const params = lang === "for you" ? {} : { languages: lang };
  const resp = await fetch(buildApi(sources.latest_data, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch latest data");

  const { data } = await resp.json();

  return data;
}

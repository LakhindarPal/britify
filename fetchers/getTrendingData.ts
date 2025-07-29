import { sources } from "constants/Api";
import type { TrendingItem } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, string, string];

export async function getTrendingData([, type, lang]: Props): Promise<TrendingItem[]> {
  const params = {
    entity_type: type,
    entity_language: lang,
  };

  const resp = await fetch(buildApi(sources.trending_data, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch search data");

  const data = await resp.json();

  if (!data.length) throw new Error("No song results found for this search query");

  return data;
}

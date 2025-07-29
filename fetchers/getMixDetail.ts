import { sources } from "constants/Api";
import type { MixDetail } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getMixDetail([_, token]: [string, string]): Promise<MixDetail> {
  const resp = await fetch(buildApi(sources.mix_detail, { token }), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch mix playlist data");

  const data = await resp.json();

  if (!data.list.length) throw new Error("The mix playlist has no songs");

  return data;
}

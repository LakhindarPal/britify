import { sources } from "constants/Api";
import type { LaunchData } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getLaunchData(): Promise<LaunchData> {
  const resp = await fetch(buildApi(sources.launch_data), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch launch data");

  return await resp.json();
}

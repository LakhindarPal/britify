import type { ListSong } from "structures";
import { formatDuration } from "./formatDuration";

export function listDuration(list?: ListSong[]) {
  return formatDuration(
    list?.reduce((total, it) => total + Number(it.more_info?.duration || 0), 0) || 0,
    "pretty"
  );
}

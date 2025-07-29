import defaultArtistImage from "assets/images/default-artist.png"; //ignore
import type { BaseArtist } from "structures";
import { toCapitalize } from "./toCapitalize";

export function dedupArtists(artists: BaseArtist[]): BaseArtist[] {
  const artistMap = new Map();

  for (const artist of artists) {
    if (artistMap.has(artist.id)) {
      const existing = artistMap.get(artist.id);
      const roles = new Set([...existing.role.split(", "), toCapitalize(artist.role)]);
      existing.role = [...roles].join(", ");
    } else {
      artistMap.set(artist.id, {
        ...artist,
        image: artist.image || defaultArtistImage,
      });
    }
  }

  return Array.from(artistMap.values());
}

export function parsePath(url: string): string {
  if (/\/song\//i.test(url))
    return url.replace(/https:\/\/www\.jiosaavn\.com\/song\/[^/]+\//i, "/song/");
  if (/\/album\//i.test(url))
    return url.replace(/https:\/\/www\.jiosaavn\.com\/album\/[^/]+\//i, "/album/");
  if (/\/featured\//i.test(url))
    return url.replace(/https:\/\/www\.jiosaavn\.com\/featured\/[^/]+\//i, "/playlist/");
  if (/\/s\/mix\//i.test(url))
    return url.replace(/^https:\/\/www\.jiosaavn\.com\/s\/mix\/[^/]+/i, "/mix");
  if (/\/artist\//i.test(url))
    return url.replace(/https:\/\/www\.jiosaavn\.com\/artist\/[^/]+\//i, "/artist/");
  return url;
}

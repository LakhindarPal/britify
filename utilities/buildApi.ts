import { baseUrl, defaultParams } from "constants/Api";

export function buildApi(source: string, params: Record<string, any> = {}): string {
  const url = new URL(baseUrl);
  const query = new URLSearchParams(source);

  for (const [k, v] of Object.entries(defaultParams)) {
    if (!query.has(k)) query.append(k, String(v));
  }

  for (const [k, v] of Object.entries(params)) {
    if (v != null) query.set(k, String(v));
  }

  url.search = query.toString();
  return url.toString();
}

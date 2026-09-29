import qs from "qs";

export function buildQuery(query: Record<string, any>): string {
  if (!query || Object.keys(query).length === 0) return "";

  return qs.stringify(query, {
    encodeValuesOnly: true,
  });
}

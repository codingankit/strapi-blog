import { StrapiResponse } from "@/types";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL) {
  throw new Error("STRAPI_URL is not defined in environment variables");
}

type FetchStrapiOptions = {
  revalidate?: number;
  cache?: RequestCache;
  tags?: string[];
  headers?: HeadersInit;
};

export async function fetchStrapi<TData, TMeta = object>(
  path: string,
  options?: FetchStrapiOptions,
): Promise<StrapiResponse<TData, TMeta>> {
  const url = `${STRAPI_URL}/api/${path}`;

  const res = await fetch(url, {
    cache: options?.cache ?? "force-cache",
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      ...options?.headers,
    },
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Strapi Error: ${res.status} - ${errorBody}`);
    throw new Error(`Strapi Fetch Error: ${res.statusText}`);
  }

  return await res.json();
}

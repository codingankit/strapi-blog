import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getURL() {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Your custom production domain (VPS, Docker, AWS, etc.)
    process.env.VERCEL_URL ?? // Auto-set by Vercel on preview deployments
    `http://localhost:${process.env.PORT ?? 3000}`; // Local dev fallback

  url = url.includes("http") ? url : `https://${url}`;
  return url.replace(/\/+$/, "");
}

/** Next gives string | string[] | undefined for query params; take the first string. */
export function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Positive integer page number; anything else (NaN, -1, 1.5, "abc") becomes 1. */
export function parsePage(value: string | string[] | undefined) {
  const n = Math.trunc(Number(firstParam(value)));
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

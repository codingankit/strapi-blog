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

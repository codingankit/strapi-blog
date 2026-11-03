import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/**
 * Strapi webhook target. Every fetch in the app is tagged "strapi", so we
 * always revalidate that (covers cross-model data such as a category name
 * shown on post cards). Entry events also revalidate their model tag.
 *
 * Note: Strapi media events have no `model` field, which is fine here.
 */
export async function POST(req: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  const secret = req.headers.get("x-revalidate-secret") ?? "";

  if (!expected || !safeEqual(secret, expected)) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body: { model?: unknown } | null = null;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const models = Array.isArray(body?.model) ? body.model : [body?.model];
  const tags = [
    "strapi",
    ...models.filter((m): m is string => typeof m === "string" && m.length > 0),
  ];

  tags.forEach((tag) => revalidateTag(tag, "max"));

  return Response.json({ revalidated: true, tags });
}

import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const model = body?.model;

  if (!model) {
    return new Response("Missing model", { status: 400 });
  }

  /**
   * Example Strapi webhook payload:
   * {
   *   "event": "entry.update",
   *   "model": "post"
   * }
   */

  // Normalize to array
  const tags = Array.isArray(model) ? model : [model];

  tags.forEach((tag) => {
    if (typeof tag === "string" && tag.length > 0) {
      revalidateTag(tag, "max");
    }
  });

  return Response.json({
    revalidated: true,
    tags,
  });
}

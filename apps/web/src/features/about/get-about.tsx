import { fetchStrapi } from "@/lib/strapi";
import { AboutData } from "./types";
import { buildQuery } from "@/lib/query";

export async function getAbout() {
  const query = buildQuery({
    fields: ["title", "content"],
  });

  const { data } = await fetchStrapi<AboutData>(`about?${query}`, {
    revalidate: 3600,
    tags: ["strapi", "about"],
  });

  return data;
}

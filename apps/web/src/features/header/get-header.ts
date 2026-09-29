import { fetchStrapi } from "@/lib/strapi";
import { HeaderData } from "./types";
import { buildQuery } from "@/lib/query";

export async function getHeader() {
  const query = buildQuery({
    fields: ["id"],
    populate: {
      logo: {
        fields: ["url", "alternativeText"],
      },
      navLinks: {
        populate: "*",
      },
      ctaBtns: {
        populate: "*",
      },
    },
  });

  const { data } = await fetchStrapi<HeaderData>(`header?${query}`, {
    revalidate: 3600,
    tags: ["strapi", "header"],
  });

  return data;
}

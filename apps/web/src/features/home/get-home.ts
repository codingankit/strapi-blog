import { fetchStrapi } from "@/lib/strapi";
import { buildQuery } from "@/lib/query";
import { HomeData } from "./types";

export async function getHome() {
  const query = buildQuery({
    fields: ["id"],
    populate: {
      sections: {
        on: {
          "sections.hero": {
            populate: "*",
          },
          "sections.featured-categories": {
            populate: {
              categories: {
                fields: ["name", "slug"],
                populate: {
                  thumbnail: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
          "sections.latest-posts": {
            populate: "*",
          },
        },
      },
    },
  });

  const { data } = await fetchStrapi<HomeData>(`home?${query}`, {
    revalidate: 3600,
    tags: ["strapi", "home"],
  });

  return data;
}

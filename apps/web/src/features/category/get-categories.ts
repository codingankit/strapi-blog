import { fetchStrapi } from "@/lib/strapi";
import { buildQuery } from "@/lib/query";
import { Category } from "@/types";

export async function getCategories(
  pageCount: number,
  page?: number,
  search?: string
) {
  const query = buildQuery({
    fields: ["slug", "name"],
    sort: ["publishedAt:desc"],
    populate: {
      thumbnail: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      ...(search && {
        name: {
          $containsi: search,
        },
      }),
    },
    pagination: {
      page: page || 1,
      pageSize: pageCount,
    },
  });

  const res = await fetchStrapi<Category[]>(`categories?${query}`, {
    revalidate: 3600,
    tags: ["strapi", "category"],
  });

  return res;
}

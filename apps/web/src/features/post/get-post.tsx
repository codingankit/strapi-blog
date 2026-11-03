import { fetchStrapi } from "@/lib/strapi";
import { buildQuery } from "@/lib/query";
import { PostCardData, SinglePostData } from "./types";
import { StrapiResponse } from "@/types";

// Arbitrary search strings must not pile up in the data cache forever.
const cacheFor = (search?: string) =>
  search
    ? { cache: "no-store" as const }
    : { revalidate: 60, tags: ["strapi", "post"] };

export async function getPosts(
  postCount: number,
  page: number,
  search?: string
): Promise<StrapiResponse<PostCardData[]>>;
export async function getPosts(
  postCount: number,
  page?: number,
  search?: string
): Promise<PostCardData[]>;

export async function getPosts(
  postCount: number,
  page?: number,
  search?: string
) {
  const query = buildQuery({
    fields: ["title", "excerpt", "slug"],
    sort: ["createdAt:desc"],
    pagination: {
      page: page || 1,
      pageSize: postCount,
    },
    filters: {
      ...(search && {
        title: {
          $containsi: search,
        },
      }),
    },
    populate: {
      thumbnail: {
        fields: ["url", "alternativeText"],
      },
      category: {
        fields: ["name"],
      },
    },
  });

  const res = await fetchStrapi<PostCardData[]>(
    `posts?${query}`,
    cacheFor(search),
  );

  return page ? res : res.data;
}

export async function getPostsByCategory(
  slug: string,
  postCount: number,
  page?: number,
  search?: string
) {
  const query = buildQuery({
    fields: ["title", "excerpt", "slug"],
    sort: ["createdAt:desc"],
    pagination: {
      page: page || 1,
      pageSize: postCount,
    },
    filters: {
      $and: [
        { category: { slug: slug } },
        ...(search ? [{ title: { $containsi: search } }] : []),
      ],
    },
    populate: {
      thumbnail: {
        fields: ["url", "alternativeText"],
      },
      category: {
        fields: ["name"],
      },
    },
  });

  return fetchStrapi<PostCardData[]>(`posts?${query}`, cacheFor(search));
}

export async function getPostBySlug(slug: string) {
  const query = buildQuery({
    fields: ["title", "excerpt", "createdAt", "content"],
    filters: {
      slug: slug,
    },
    populate: {
      thumbnail: {
        fields: ["url", "alternativeText"],
      },
      category: {
        fields: ["name", "slug"],
      },
    },
  });

  const { data } = await fetchStrapi<SinglePostData[]>(`posts?${query}`, {
    revalidate: 60,
    tags: ["strapi", "post"],
  });

  return data[0];
}

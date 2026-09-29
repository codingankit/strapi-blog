import { Category, StrapiImage } from "@/types";

export interface PostData {
  id: number;
  documentId: string;
  title: string;
  excerpt: string;
  slug: string;
  thumbnail: StrapiImage;
  category: Category;
  content: string;
  createdAt: string;
}

export type PostCardData = Omit<
  PostData,
  "content" | "createdAt" | "category"
> & {
  category: Omit<Category, "thumbnail" | "slug">;
};

export type SinglePostData = Omit<PostData, "excerpt" | "slug" | "category"> & {
  category: Omit<Category, "thumbnail">;
};

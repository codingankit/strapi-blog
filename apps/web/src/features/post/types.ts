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
  // A post can exist without a category; the UI must not assume one.
  category?: Omit<Category, "thumbnail" | "slug"> | null;
};

export type SinglePostData = Omit<PostData, "slug" | "category"> & {
  category?: Omit<Category, "thumbnail"> | null;
};

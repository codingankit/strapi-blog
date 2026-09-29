import { Btn, Category } from "@/types";

export enum HomeSectionType {
  Hero = "sections.hero",
  FeaturedCategories = "sections.featured-categories",
  LatestPosts = "sections.latest-posts",
}

export interface HeroSection {
  __component: HomeSectionType.Hero;
  id: number;
  title: string;
  description: string;
  ctaBtn: Btn;
}

export interface FeaturedCategoriesSection {
  __component: HomeSectionType.FeaturedCategories;
  id: number;
  title: string;
  categories: Category[];
}

export interface LatestPostsSection {
  __component: HomeSectionType.LatestPosts;
  id: number;
  title: string;
  postCount: number;
}

export type HomeSection =
  | HeroSection
  | LatestPostsSection
  | FeaturedCategoriesSection;

export interface HomeData {
  id: number;
  documentId: string;
  sections: HomeSection[];
}

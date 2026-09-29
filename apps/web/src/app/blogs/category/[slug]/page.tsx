import { EmptyState } from "@/components/shared/EmptyState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { SearchBar } from "@/components/shared/SearchBar";
import { PostCard, getPostsByCategory } from "@/features/post";
import { notFound } from "next/navigation";

export default async function Category({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { slug } = await params;
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 12;

  const { data: posts, meta } = await getPostsByCategory(
    slug,
    pageSize,
    currentPage,
    search
  );

  if (!posts || (posts.length === 0 && !search)) {
    return notFound();
  }

  const pageCount = meta.pagination?.pageCount ?? 0;

  const SPECIAL_CASES: Record<string, string> = {
    "ui-ux-design": "UI/UX Design",
    "ui-ux": "UI/UX",
  };

  const categoryName =
    posts[0]?.category?.name ||
    SPECIAL_CASES[slug.toLowerCase()] ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pb-24 md:pt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-12">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl text-foreground leading-tight">
          {categoryName}
        </h1>
        <div className="w-full md:w-1/3">
          <SearchBar placeholder="Search blogs..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {posts.map((post) => (
          <PostCard data={post} key={post.id} />
        ))}
      </div>

      {posts.length === 0 && (
        <EmptyState
          title="No posts found"
          description="We couldn't find any matches. Please try a different search or check back later."
        />
      )}

      <PaginationControls currentPage={currentPage} pageCount={pageCount} />
    </section>
  );
}

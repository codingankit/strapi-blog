import { PostCard, getPosts } from "@/features/post";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { SearchBar } from "@/components/shared/SearchBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { Suspense } from "react";

export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const { search, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 12;

  const { data: posts, meta } = await getPosts(pageSize, currentPage, search);

  const pageCount = meta.pagination?.pageCount ?? 0;

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pb-24 md:pt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-12">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl text-foreground leading-tight">
          Blogs
        </h1>
        <div className="w-full md:w-1/3">
          <Suspense fallback={null}>
            <SearchBar placeholder="Search blogs..." />
          </Suspense>
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

      <Suspense fallback={null}>
        <PaginationControls currentPage={currentPage} pageCount={pageCount} />
      </Suspense>
    </section>
  );
}

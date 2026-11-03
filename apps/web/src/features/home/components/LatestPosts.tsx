import { getPosts } from "@/features/post";
import { LatestPostsSection } from "../types";
import { PostCard } from "@/features/post";

export async function LatestPosts({ data }: { data: LatestPostsSection }) {
  const posts = await getPosts(data.postCount);

  return (
    <section className="flex flex-col items-center justify-center gap-8 mt-24 max-w-7xl mx-auto px-6 pb-20">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {posts.map((post) => (
          <PostCard data={post} key={post.id} />
        ))}
      </div>
    </section>
  );
}

import { getPostBySlug } from "@/features/post";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pb-24">
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-3 mb-6">
          <Link href={`/blogs/category/${post.category.slug}`}>
            <Badge
              variant="secondary"
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {post.category.name}
            </Badge>
          </Link>
          <span className="text-muted-foreground/50">|</span>
          <time className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        <h1 className="text-2xl font-bold tracking-tight md:text-4xl text-foreground leading-tight">
          {post.title}
        </h1>
      </div>

      <div className="relative aspect-video w-full overflow-hidden mb-10 md:mb-12 rounded-xl border bg-muted shadow-sm">
        <Image
          src={post.thumbnail.url}
          alt={post.title}
          fill
          className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-700"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <Suspense fallback={null}>
        <MarkdownContent content={post.content} />
      </Suspense>
    </section>
  );
}

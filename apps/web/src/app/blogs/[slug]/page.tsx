import { getPostBySlug } from "@/features/post";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.createdAt,
      images: [post.thumbnail.url],
    },
  };
}

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pb-24">
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-3 mb-6">
          {post.category && (
            <>
              <Link href={`/blogs/category/${post.category.slug}`}>
                <Badge
                  variant="secondary"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {post.category.name}
                </Badge>
              </Link>
              <span className="text-muted-foreground/50">|</span>
            </>
          )}
          <time
            dateTime={post.createdAt}
            className="text-sm text-muted-foreground"
          >
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
          priority
          sizes="(min-width: 1280px) 1232px, 100vw"
          className="object-cover w-full h-full"
        />
      </div>

      <MarkdownContent content={post.content} />
    </section>
  );
}

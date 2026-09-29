import { PostCardData } from "./types";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function PostCard({ data: post }: { data: PostCardData }) {
  return (
    <Link href={`/blogs/${post?.slug}`} className="group">
      <Card className="overflow-hidden border-muted/50 hover:shadow-xl transition-all duration-500 pt-0 h-full flex flex-col bg-card">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={post.thumbnail.url}
            alt={post.title}
            fill
            className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-700"
          />

          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <CardHeader className="flex flex-col gap-4 px-4 py-2 flex-1">
          <div className="flex items-center">
            <Badge
              variant="secondary"
              className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground"
            >
              {post.category.name}
            </Badge>
          </div>

          <CardTitle className="text-lg font-semibold leading-[1.3] tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}

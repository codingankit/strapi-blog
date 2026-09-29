import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Category } from "@/types";

export function CategoryCard({ data: category }: { data: Category }) {
  return (
    <Link
      href={`/blogs/category/${category.slug}`}
      key={category.id}
      className="group"
    >
      <Card className="overflow-hidden border-muted/50 hover:shadow-xl transition-all duration-500 pt-0 h-full flex flex-col bg-card">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={category.thumbnail.url}
            alt={category.name}
            fill
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <CardHeader className="flex justify-center items-center p-3">
          <CardTitle className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
            {category.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

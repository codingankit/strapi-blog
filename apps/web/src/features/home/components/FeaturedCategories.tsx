import { FeaturedCategoriesSection } from "../types";
import { CategoryCard } from "@/features/category";

export function FeaturedCategories({
  data,
}: {
  data: FeaturedCategoriesSection;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-8 mt-24 mx-auto max-w-7xl px-6 pb-20">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {data.categories.map((category) => (
          <CategoryCard data={category} key={category.id} />
        ))}
      </div>
    </section>
  );
}

import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { getAbout } from "@/features/about";

export default async function About() {
  const about = await getAbout();

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pb-24 md:pt-10">
      <div className="mb-10 md:mb-12">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl text-foreground leading-tight">
          {about.title}
        </h1>
      </div>

      <MarkdownContent content={about.content} />
    </section>
  );
}

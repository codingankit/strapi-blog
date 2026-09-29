import { Search } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-19 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative mb-5">
        <div className="absolute inset-0 scale-150 blur-3xl bg-primary/10 rounded-full" />
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-background border shadow-sm">
          <Search className="h-6 w-6 text-muted-foreground/50 stroke-[1.25px]" />
        </div>
      </div>

      <h3 className="text-xl font-medium tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground max-w-[300px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

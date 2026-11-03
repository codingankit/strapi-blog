export function Footer() {
  return (
    <footer className="w-full">
      <div className="container mx-auto flex flex-col justify-center items-center pt-20 pb-10 gap-4">
        <div className="text-sm font-bold tracking-tighter uppercase">
          Strapi Blog<span className="text-primary">.</span>
        </div>

        <p className="text-xs text-muted-foreground tracking-wide">
          © {new Date().getFullYear()} All rights reserved.
        </p>

        <div className="flex gap-6 mt-2">
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </footer>
  );
}

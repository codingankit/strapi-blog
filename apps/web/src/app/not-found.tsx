import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[75vh] pb-6 pt-10 px-6 text-center">
      <h1 className="text-[120px] sm:text-[150px] md:text-[180px] font-extrabold tracking-tighter leading-none text-foreground">
        404
      </h1>

      <div className="space-y-4 mt-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Page not found
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-112.5 mx-auto leading-relaxed">
          The link you followed may be broken, or the page may have been
          removed.
        </p>
      </div>

      <div className="mt-10 w-full sm:w-auto">
        <Button
          size="lg"
          className="w-full sm:w-auto rounded-full px-12 h-12 text-base transition-all hover:shadow-lg active:scale-95"
          asChild
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}

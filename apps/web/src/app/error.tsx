"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-muted-foreground">
        We couldn&apos;t load this page. Please try again in a moment.
      </p>
      <Button className="mt-8 rounded-full px-6" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}

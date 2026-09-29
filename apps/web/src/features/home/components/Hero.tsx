import { Button } from "@/components/ui/button";
import { HeroSection } from "../types";
import Link from "next/link";

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="relative mt-10 py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <h1 className="text-[60px] md:text-[90px] lg:text-[110px] font-bold tracking-tighter leading-[0.9] text-foreground">
        {data.title}
      </h1>

      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-[700px] leading-relaxed">
        {data.description}
      </p>

      <div className="mt-10">
        <Button
          size="lg"
          className="h-12 px-8 text-base font-medium transition-all hover:scale-105 hover:shadow-lg active:scale-95 rounded-full"
          asChild
        >
          <Link href={data.ctaBtn.href}>{data.ctaBtn.label}</Link>
        </Button>
      </div>
    </section>
  );
}

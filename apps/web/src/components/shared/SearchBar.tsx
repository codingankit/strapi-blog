"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Search, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar({
  placeholder = "Search by title..",
}: {
  placeholder?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentQuery = searchParams.get("search")?.toString() || "";
  const [term, setTerm] = useState(currentQuery);
  const [prevQuery, setPrevQuery] = useState(currentQuery);

  if (prevQuery !== currentQuery) {
    setPrevQuery(currentQuery);
    setTerm(currentQuery);
  }

  const handleSearch = useDebouncedCallback((newTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (newTerm) {
      params.set("search", newTerm);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, 400);

  const handleClear = () => {
    setTerm("");
    handleSearch("");
  };

  return (
    <div className="relative group w-full max-w-md mt-4">
      {/* Search/Loading Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        )}
      </div>

      <Input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        className="pl-10 pr-10 h-11 w-full bg-background border-muted-foreground/20 shadow-sm transition-all duration-200 focus-visible:ring-primary/20 focus-visible:border-primary rounded-lg"
      />

      {term ? (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

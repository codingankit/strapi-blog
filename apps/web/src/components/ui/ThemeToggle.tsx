"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer px-2 py-2 rounded-full transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 transition-all" />
      ) : (
        <Moon className="h-6 w-6 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </span>
  );
}

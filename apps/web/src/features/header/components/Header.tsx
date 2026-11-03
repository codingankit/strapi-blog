import Image from "next/image";
import { getHeader } from "../get-header";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { HeaderAuthActions } from "./HeaderAuthActions";

export async function Header() {
  const header = await getHeader();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex-1 flex items-center justify-start">
          <Link href="/">
            <Image
              src={header.logo.url}
              alt={header.logo.alternativeText || "Logo"}
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center">
          <ul className="flex items-center gap-2">
            {header.navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground px-4 py-2 rounded-full transition-all hover:text-foreground hover:bg-accent/50 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 flex items-center justify-end gap-3">
          {/* Desktop Only Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <HeaderAuthActions ctaBtns={header.ctaBtns} />
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <MobileMenu header={header} />
          </div>
        </div>
      </div>
    </header>
  );
}

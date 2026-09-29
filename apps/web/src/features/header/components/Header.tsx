import Image from "next/image";
import { getHeader } from "../get-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { getUser } from "@/features/auth";
import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export async function Header() {
  const header = await getHeader();
  const { isAuthenticated, isRecovery } = await getUser();

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
            {header.ctaBtns.map((btn) => {
              const isLoginBtn = btn.href === "/login";
              if (isLoginBtn && isAuthenticated) return null;

              return (
                <Button
                  key={btn.id}
                  size="sm"
                  className="rounded-full px-5 h-9 font-medium"
                  asChild
                >
                  <Link href={btn.href}>{btn.label}</Link>
                </Button>
              );
            })}
            {isAuthenticated && !isRecovery && (
              <>
                <Button size="sm" className="rounded-full px-5 h-9 font-medium">
                  <Link href="/profile">Profile</Link>
                </Button>

                <LogoutButton />
              </>
            )}

            {isAuthenticated && isRecovery && (
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 gap-1.5 px-3 py-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Recovery Mode
                </Badge>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <MobileMenu
              header={header}
              isAuthenticated={isAuthenticated}
              isRecovery={isRecovery}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

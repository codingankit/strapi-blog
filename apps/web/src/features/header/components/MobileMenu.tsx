"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { HeaderData } from "../types";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { Badge } from "@/components/ui/badge";

export function MobileMenu({
  header,
  isAuthenticated,
  isRecovery,
}: {
  header: HeaderData;
  isAuthenticated: boolean;
  isRecovery: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] flex flex-col border-l bg-background"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Browse site pages</SheetDescription>
        </SheetHeader>

        <div className="pt-12 px-2 flex flex-col gap-2">
          {header.navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground px-4 py-3 rounded-full transition-all hover:text-foreground hover:bg-accent/50 block w-full active:bg-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4">
            {header.ctaBtns.map((btn) => {
              const isLoginBtn = btn.href === "/login";
              if (isLoginBtn && isAuthenticated) return null;

              return (
                <Button
                  key={btn.id}
                  size="sm"
                  className="rounded-full px-5 h-9 font-medium"
                  onClick={() => setOpen(false)}
                  asChild
                >
                  <Link href={btn.href}>{btn.label}</Link>
                </Button>
              );
            })}
            {isAuthenticated && !isRecovery && (
              <>
                <Button
                  size="sm"
                  className="rounded-full px-5 h-9 font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/profile">Profile</Link>
                </Button>

                <LogoutButton onSuccess={() => setOpen(false)} />
              </>
            )}

            {isRecovery && (
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
        </div>
      </SheetContent>
    </Sheet>
  );
}

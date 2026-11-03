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
import { Menu } from "lucide-react";
import Link from "next/link";
import { HeaderData } from "../types";
import { HeaderAuthActions } from "./HeaderAuthActions";

export function MobileMenu({ header }: { header: HeaderData }) {
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
        className="w-75 flex flex-col border-l bg-background"
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
            <HeaderAuthActions
              ctaBtns={header.ctaBtns}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

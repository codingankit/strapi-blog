"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { useUser } from "@/features/auth/hooks";
import type { Btn } from "@/types";

/**
 * Auth-dependent header actions. Lives on the client so the root layout
 * doesn't call cookies() and every page stays cacheable/static.
 */
export function HeaderAuthActions({
  ctaBtns,
  onNavigate,
}: {
  ctaBtns: Btn[];
  onNavigate?: () => void;
}) {
  const { isAuthenticated, isRecovery, isLoading } = useUser();

  return (
    <>
      {ctaBtns.map((btn) => {
        // Hide "Login" until we know the user is signed out (no flash for
        // signed-in users). Signed-out visitors resolve immediately.
        if (btn.href === "/login" && (isLoading || isAuthenticated)) {
          return null;
        }

        return (
          <Button
            key={btn.id}
            size="sm"
            className="rounded-full px-5 h-9 font-medium"
            onClick={onNavigate}
            asChild
          >
            <Link href={btn.href}>{btn.label}</Link>
          </Button>
        );
      })}

      {!isLoading && isAuthenticated && !isRecovery && (
        <>
          <Button
            size="sm"
            className="rounded-full px-5 h-9 font-medium"
            onClick={onNavigate}
            asChild
          >
            <Link href="/profile">Profile</Link>
          </Button>
          <LogoutButton onSuccess={onNavigate} />
        </>
      )}

      {!isLoading && isAuthenticated && isRecovery && (
        <Badge
          variant="secondary"
          className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 gap-1.5 px-3 py-1"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Recovery Mode
        </Badge>
      )}
    </>
  );
}

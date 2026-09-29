"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "@/features/auth/actions";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export function LogoutButton({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    onSuccess?.();
    setIsLoggingOut(true);
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  if (!mounted) {
    return (
      <Button
        size="sm"
        variant="link"
        className="font-medium text-destructive p-0 h-auto"
      >
        Logout
      </Button>
    );
  }

  return (
    <ConfirmDialog
      title="Are you sure?"
      description="You will need to login again to access your account."
      actionText="Logout"
      cancelText="Cancel"
      variant="destructive"
      onConfirm={handleLogout}
      isLoading={isLoggingOut}
      trigger={
        <Button
          size="sm"
          variant="link"
          className="font-medium text-destructive p-0 h-auto"
          disabled={isLoggingOut}
        >
          Logout
        </Button>
      }
    />
  );
}

"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { createClient } from "@/utils/supabase/client";

const emptySubscribe = () => () => {};

export function LogoutButton({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Sign out with the browser client: it clears the cookies and emits
    // SIGNED_OUT, so useUser() (and therefore the header) updates instantly
    // and this button unmounts together with its dialog.
    const { error } = await createClient().auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      toast.error("Logout failed", { description: "Please try again." });
      setIsLoggingOut(false);
      return;
    }

    onSuccess?.();
    router.push("/?notify=logout_success");
    router.refresh(); // re-render server components without the old session
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

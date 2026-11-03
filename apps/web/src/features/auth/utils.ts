import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user,
    isAuthenticated: !!user,
    isRecovery: user?.user_metadata?.is_recovery,
  };
}

export async function protectRoute() {
  const { user, isAuthenticated } = await getUser();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return user;
}

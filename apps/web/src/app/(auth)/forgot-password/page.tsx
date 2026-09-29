import { redirect } from "next/navigation";
import { ForgotPasswordForm, getUser } from "@/features/auth";
import { Suspense } from "react";

export default async function ForgotPassword() {
  const { isAuthenticated, isRecovery } = await getUser();

  if (isRecovery) {
    redirect("/reset-password");
  }

  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <Suspense fallback={null}>
      <ForgotPasswordForm />
    </Suspense>
  );
}

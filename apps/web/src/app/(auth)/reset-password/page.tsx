import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/features/auth";
import { getUser } from "@/features/auth";
import { Suspense } from "react";

export default async function ResetPassword() {
  const { isRecovery } = await getUser();

  if (!isRecovery) {
    redirect("/");
  }

  <Suspense fallback={null}>
    <ResetPasswordForm />
  </Suspense>;
}

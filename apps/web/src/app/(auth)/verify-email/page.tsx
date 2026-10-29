"use client";

import { Mail } from "lucide-react";
import {
  checkVerificationStatus,
  resendVerificationEmail,
} from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

const COOLDOWN_TIME = 90;

export default function VerifyEmail() {
  const router = useRouter();

  const [userId] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? sessionStorage.getItem("pending_verification_user_id")
      : null,
  );
  const [email] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? sessionStorage.getItem("pending_verification_email")
      : null,
  );

  const [isPending, startTransition] = useTransition();
  const [countdown, setCountdown] = useState(COOLDOWN_TIME);

  useEffect(() => {
    if (!userId && !email) {
      router.replace("/login");
    }
  }, [userId, email, router]);

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    const handleSuccess = async () => {
      sessionStorage.removeItem("pending_verification_user_id");
      sessionStorage.removeItem("pending_verification_email");
      const {
        data: { session },
      } = await supabase.auth.getSession();

      window.location.href = session ? "/" : `/login`;
    };

    const channel = supabase
      .channel("verification-status")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new.email_confirmed_at) {
            handleSuccess();
          }
        },
      )
      .subscribe();

    checkVerificationStatus(userId).then(({ isVerified }) => {
      if (isVerified) handleSuccess();
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleClick = () => {
    if (countdown > 0) return;

    startTransition(async () => {
      const { error, success } = await resendVerificationEmail(email!);
      if (!success) {
        toast.error("Failed to resend verification email.");
        console.error(error);
      } else {
        toast.success("We have resent the verification email.");
        setCountdown(COOLDOWN_TIME);
      }
    });
  };

  if (!userId) return null;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-112.5 p-10">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <Mail className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4 text-center">
          Check your Email
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-8 text-center">
          We&apos;ve sent a temporary verification link to your inbox. Please
          click the link to verify your email and get started.
        </p>

        <div className="pt-4 w-full text-muted-foreground leading-tight text-sm font-medium text-center">
          Didn&apos;t receive the email?
          <Button
            disabled={isPending || countdown > 0}
            variant="link"
            className="text-primary inline p-0 ml-1 h-auto font-semibold"
            onClick={handleClick}
          >
            {isPending ? (
              <span className="flex items-center gap-1">Sending...</span>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              "Resend"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

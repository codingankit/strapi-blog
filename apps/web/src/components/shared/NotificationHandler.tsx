"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationConfig {
  message: string;
  description?: string;
  type: NotificationType;
}

const NOTIFICATION_MAP: Record<string, NotificationConfig> = {
  login_success: {
    message: "Welcome back!",
    description: "You have successfully logged in.",
    type: "success",
  },
  logout_success: {
    message: "Logged out!",
    description: "You have been safely logged out.",
    type: "info",
  },
  acc_created: {
    message: "Account Created Successfully!",
    type: "success",
  },
  signup_success_email: {
    message: "Email Verified Successfully!",
    description: "Welcome to Strapi Blog. Your account is now active.",
    type: "success",
  },
  signup_success_oauth: {
    message: "Account Created Successfully!",
    description: "Welcome to Strapi Blog. You have successfully signed ups.",
    type: "success",
  },
  verifed_other_device: {
    message: "Verified on another device",
    description:
      "Your email is confirmed! Login here to sync this device and get started.",
    type: "success",
  },
  link_expired: {
    message: "Link Expired or Invalid!",
    description:
      "This link has already been used or has expired. If your email is not verified, please login to receive a new link.",
    type: "error",
  },
  link_expired_reset_pass: {
    message: "Link Expired or Invalid!",
    description:
      "This link has already been used or has expired. Please send a new link.",
    type: "error",
  },
  reset_password: {
    message: "Identity Verified!",
    description: "You can now set your new password below.",
    type: "info",
  },
  reset_cancelled: {
    message: "Reset Password Cancelled!",
    description: "You have successfully cancelled the reset password.",
    type: "info",
  },
  reset_pass_session_expired: {
    message: "Reset Password Session Expired!",
    description:
      "You'll need to request a new password reset email to continue.",
    type: "error",
  },
  link_processed: {
    message: "You're all good!",
    description:
      "We saw you clicked a link, but you're already logged in and good to go.",
    type: "info",
  },
  auth_code_error: {
    message: "Authentication failed!",
    description:
      "There was an error with the authentication. Please try again.",
    type: "error",
  },
  error: {
    message: "Something went wrong!",
    description: "Please try again later.",
    type: "error",
  },
  unauthorized: {
    message: "Access Denied!",
    description: "You don't have access to that page!",
    type: "warning",
  },
};

export function NotificationHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const notifyKey = searchParams.get("notify");

    if (notifyKey && NOTIFICATION_MAP[notifyKey]) {
      const { message, description, type } = NOTIFICATION_MAP[notifyKey];
      const timeoutId = setTimeout(() => {
        toast.dismiss();
        toast[type](message, {
          description: description,
          duration: 5000,
        });

        const params = new URLSearchParams(searchParams.toString());
        params.delete("notify");
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl, { scroll: false });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [searchParams, router, pathname]);

  return null;
}

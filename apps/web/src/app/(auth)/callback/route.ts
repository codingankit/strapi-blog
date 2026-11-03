import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

/** Only allow same-origin relative paths ("/foo"), never "//host" or "@host". */
function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) {
    return "/";
  }
  return raw;
}

function redirectTo(origin: string, path: string, notify?: string) {
  const url = new URL(path, origin);
  if (url.origin !== origin) return NextResponse.redirect(`${origin}/`);
  if (notify) url.searchParams.set("notify", notify);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));
  const type = searchParams.get("type");
  const errorCode = searchParams.get("error_code");
  const token_hash = searchParams.get("token_hash");

  const isRecovery = type === "recovery";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    if (isRecovery) {
      return redirectTo(origin, "/reset-password");
    }
    return redirectTo(origin, "/", "link_processed");
  }

  if (errorCode === "otp_expired") {
    const target = isRecovery ? "/forgot-password" : "/login";
    const notify = isRecovery ? "link_expired_reset_pass" : "link_expired";
    return redirectTo(origin, target, notify);
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    });

    if (!error) {
      if (isRecovery) {
        await supabase.auth.updateUser({ data: { is_recovery: true } });
        return redirectTo(origin, next);
      }

      return redirectTo(origin, next, "signup_success_email");
    } else {
      console.error("Token Verification Error:", error.message);
      return redirectTo(origin, "/login", "link_expired");
    }
  }

  if (code) {
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { user } = data;
      const provider = user.app_metadata.provider;

      if (isRecovery) {
        await supabase.auth.updateUser({ data: { is_recovery: true } });
        return redirectTo(origin, next);
      }

      if (provider !== "email") {
        const isNewUser =
          user.created_at === user.last_sign_in_at || !user.last_sign_in_at;
        const notifyKey = isNewUser ? "signup_success_oauth" : "login_success";
        return redirectTo(origin, next, notifyKey);
      }

      return redirectTo(origin, next, "signup_success_email");
    } else {
      console.error("Auth Callback Error:", error?.message);
    }
  }

  return redirectTo(origin, "/login", "auth_code_error");
}

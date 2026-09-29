import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
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
      return NextResponse.redirect(`${origin}/reset-password`);
    }
    return NextResponse.redirect(`${origin}/?notify=link_processed`);
  }

  if (errorCode === "otp_expired") {
    const target = isRecovery ? "/forgot-password" : "/login";
    const notify = isRecovery ? "link_expired_reset_pass" : "link_expired";
    return NextResponse.redirect(`${origin}${target}?notify=${notify}`);
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    });

    if (!error) {
      if (isRecovery) {
        await supabase.auth.updateUser({ data: { is_recovery: true } });
        return NextResponse.redirect(`${origin}${next}`);
      }

      return NextResponse.redirect(
        `${origin}${next}?notify=signup_success_email`
      );
    } else {
      console.error("Token Verification Error:", error.message);
      return NextResponse.redirect(`${origin}/login?notify=link_expired`);
    }
  }

  if (code) {
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { user } = data;
      const provider = user.app_metadata.provider;

      if (isRecovery) {
        await supabase.auth.updateUser({ data: { is_recovery: true } });
        return NextResponse.redirect(`${origin}${next}`);
      }

      if (provider !== "email") {
        const isNewUser =
          user.created_at === user.last_sign_in_at || !user.last_sign_in_at;
        const notifyKey = isNewUser ? "signup_success_oauth" : "login_success";
        return NextResponse.redirect(`${origin}${next}?notify=${notifyKey}`);
      }

      return NextResponse.redirect(
        `${origin}${next}?notify=signup_success_email`
      );
    } else {
      console.error("Auth Callback Error:", error?.message);
    }
  }

  return NextResponse.redirect(`${origin}/login?notify=auth_code_error`);
}

"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SignupSchema, LoginSchema } from "./schemas";
import { getURL } from "@/lib/utils";

export async function signUp(values: SignupSchema) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        name: values.name,
      },
      emailRedirectTo: `${getURL()}/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data?.user && data.user.identities?.length === 0) {
    return { error: "This email is already registered, Sign in instead" };
  }

  const userId = data.user?.id;

  return { success: true, userId };
}

export async function checkVerificationStatus(userId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("email_confirmed_at")
    .eq("id", userId)
    .single();

  return {
    isVerified: !!data?.email_confirmed_at,
    exists: !!data,
  };
}

export async function resendVerificationEmail(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: `${getURL()}/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
  };
}

export async function logIn(values: LoginSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function logOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
  }

  revalidatePath("/", "layout");

  redirect("/?notify=logout_success");
}

export async function forgotPassword(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}/callback?type=recovery&next=/reset-password?notify=reset_password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function resetPassword(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password,
    data: { is_recovery: false },
  });

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function logInWithGoogle() {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getURL()}/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("OAuth Error:", error.message);
    return { error: error.message };
  }

  return { url: data.url };
}

export async function logInWithGithub() {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${getURL()}/callback`,
    },
  });

  if (error) {
    console.error("OAuth Error:", error.message);
    return { error: error.message };
  }

  return { url: data.url };
}

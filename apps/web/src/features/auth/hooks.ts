"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  signupSchema,
  SignupSchema,
  loginSchema,
  LoginSchema,
  forgotPasswordSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  resetPasswordSchema,
} from "./schemas";

export const useSignupForm = () =>
  useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

export const useLoginForm = () =>
  useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

export const useForgotPasswordForm = () =>
  useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

export const useResetPasswordForm = () =>
  useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

const AUTH_CHANGED_EVENT = "auth:changed";

/**
 * Call after a server action changed the auth cookies (login, password reset).
 * The browser Supabase client can't see server-side cookie changes, so this
 * tells every mounted useUser() to re-read the user.
 */
export function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getSession();
    window.addEventListener(AUTH_CHANGED_EVENT, getSession);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener(AUTH_CHANGED_EVENT, getSession);
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isRecovery: !!user?.user_metadata?.is_recovery,
  };
}

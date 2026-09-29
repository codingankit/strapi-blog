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
    resolver: zodResolver(signupSchema as any),
    defaultValues: { name: "", email: "", password: "" },
  });

export const useLoginForm = () =>
  useForm<LoginSchema>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: { email: "", password: "" },
  });

export const useForgotPasswordForm = () =>
  useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema as any),
    defaultValues: { email: "" },
  });

export const useResetPasswordForm = () =>
  useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema as any),
    defaultValues: { password: "" },
  });

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isRecovery: user?.user_metadata?.is_recovery,
  };
}

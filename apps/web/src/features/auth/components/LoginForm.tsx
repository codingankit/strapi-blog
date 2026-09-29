"use client";

import Link from "next/link";
import { useLoginForm } from "../hooks";
import { LoginSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { logIn, resendVerificationEmail } from "../actions";
import { useRouter } from "next/navigation";

export function LoginForm({ email }: { email?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useLoginForm();

  useEffect(() => {
    if (email) {
      form.setValue("email", email);
      form.setFocus("password");
    } else {
      form.setFocus("email");
    }
  }, [email, form]);

  const onSubmit = async (values: LoginSchema) => {
    setIsLoading(true);
    setError(null);

    const { error, success } = await logIn(values);

    const safeEmail = encodeURIComponent(values.email);

    if (error) {
      if (error.includes("not confirmed")) {
        const { error: resendError } = await resendVerificationEmail(
          values.email
        );

        setIsLoading(false);

        if (resendError) {
          setError(
            "Unable to send verification email. Please try again in a few minutes."
          );
          console.log(resendError);
        } else {
          router.push(`/check-email?email=${safeEmail}`);
        }
      } else {
        if (error.includes("Invalid login credentials")) {
          setError("Wrong email or password");
        } else {
          setError("Something went wrong. Please try again later.");
          console.log(error);
        }
      }

      setIsLoading(false);
      return;
    }

    if (success) {
      router.push("/?notify=login_success");
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 focus-visible:ring-primary/20 transition-all dark:bg-muted/20"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="text-sm font-medium text-destructive text-center py-4 rounded-lg">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full rounded-xl h-11 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
}

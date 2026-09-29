"use client";

import { useRouter } from "next/navigation";
import { resetPassword } from "../actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordForm } from "../hooks";
import { ResetPasswordSchema } from "../schemas";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useResetPasswordForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const isPending = isLoading || isCancelLoading;

  const handleCancel = async () => {
    setIsCancelLoading(true);

    const supabase = createClient();

    await supabase.auth.updateUser({
      data: { is_recovery: false },
    });

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsCancelLoading(false);

      toast.error("Something went wrong!", {
        description: "Failed to cancel reset password.",
      });

      console.log(error);
    }

    router.push("/login?notify=reset_cancelled");
    router.refresh();
    setIsCancelLoading(false);
  };

  const onSubmit = async (values: ResetPasswordSchema) => {
    setIsLoading(true);
    const password = values.password;

    const { error } = await resetPassword(password);

    if (!error) {
      form.reset();
      setIsLoading(false);
      toast.success("Password updated!", {
        description: "We are logging you in...",
      });

      router.push("/?notify=login_success");
      router.refresh();
      return;
    }

    console.error("Reset Error:", error);

    if (error.includes("expired")) {
      setIsLoading(false);
      router.push("/forgot-password?notify=reset_pass_session_expired");
      return;
    }

    if (error.includes("different from the old password")) {
      setIsLoading(false);
      toast.error("New password can't be same as old password!", {
        description: "Please enter a different password.",
      });

      return;
    }

    toast.error("Something went wrong!", {
      description: "Failed to update password. Please try again later.",
    });

    setIsLoading(false);
    return;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-105 bg-background rounded-3xl border shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Reset Password
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 mb-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
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
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full rounded-xl h-11 font-semibold"
                disabled={isPending}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>

              <ConfirmDialog
                title="Are you sure?"
                description="This will exit you from password reset and your reset link will expire. You'll need to request a new one to try again."
                actionText="Yes, Cancel"
                cancelText="No, Keep"
                variant="destructive"
                isLoading={isCancelLoading}
                onConfirm={handleCancel}
                trigger={
                  <Button
                    variant="link"
                    type="button"
                    className="text-destructive"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                }
              />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

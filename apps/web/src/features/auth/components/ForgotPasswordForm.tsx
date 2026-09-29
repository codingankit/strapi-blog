"use client";

import { useState } from "react";
import { forgotPassword } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForgotPasswordForm } from "../hooks";
import { ForgotPasswordSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForgotPasswordForm();

  const onSubmit = async (values: ForgotPasswordSchema) => {
    setIsLoading(true);
    const email = values.email;

    const { error } = await forgotPassword(email);

    if (!error) {
      form.reset();
      toast.success("Reset link sent!", {
        description:
          "If an account exists with this email, you will receive a reset link shortly.",
      });
      router.push("/login");
      router.refresh();
      return;
    }

    toast.error("Something went wrong!", {
      description: "Failed to send reset link. Please try again later.",
    });

    console.log(error);

    setIsLoading(false);
    return;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-107.5 bg-background rounded-3xl border shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 mb-5">
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
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full rounded-xl h-11 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button variant="link" className="text-sm text-muted-foreground">
                <ArrowLeft />
                <Link href="/login">Back to Login</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

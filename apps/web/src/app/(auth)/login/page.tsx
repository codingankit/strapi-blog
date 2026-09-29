import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm, getUser } from "@/features/auth";
import { SignupForm } from "@/features/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GoogleLoginButton } from "@/features/auth";
import { GithubLoginButton } from "@/features/auth";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { isAuthenticated, isRecovery } = await getUser();

  if (isRecovery) {
    redirect("/reset-password");
  }

  if (isAuthenticated) {
    redirect("/");
  }

  const { email } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-112.5 bg-background p-6 mb:p-8 px-4 md:px-6 rounded-3xl border shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 rounded-full h-12">
            <TabsTrigger
              value="login"
              className="rounded-full data-[state=inactive]:text-primary/70 dark:data-[state=active]:bg-secondary-background"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-full data-[state=inactive]:text-primary/70 dark:data-[state=active]:bg-secondary-background"
            >
              Signup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm email={email} />
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-medium">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GoogleLoginButton />
          <GithubLoginButton />
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground px-6 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-primary">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Mail, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// type ViewState = "selection" | "sales" | "support";

export default function Contact() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl min-h-[600px]">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight">How can we help?</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-300">
        <Card
          className="group cursor-pointer hover:border-primary transition-all duration-300 shadow-md"
          onClick={() => router.push("/contact/sales")}
        >
          <CardHeader className="space-y-4">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">Sales & Partnerships</CardTitle>
              <CardDescription className="text-base mt-2">
                Interested in a custom plan or enterprise features? Let&apos;s talk
                business.
              </CardDescription>
            </div>
            <div className="flex items-center text-primary font-medium">
              Contact Sales <ChevronRight className="ml-1 h-4 w-4" />
            </div>
          </CardHeader>
        </Card>

        <Card className="group cursor-pointer hover:border-primary transition-all duration-300 shadow-md">
          <CardHeader className="space-y-4">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">Technical Support</CardTitle>
              <CardDescription className="text-base mt-2">
                Need help with your account or having a technical issue?
              </CardDescription>
            </div>
            <div className="flex items-center text-primary font-medium">
              Get Help <ChevronRight className="ml-1 h-4 w-4" />
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* <Card className="max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              className="w-fit -ml-2"
              onClick={() => setView("selection")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <CardTitle className="text-2xl text-center">
              Contact Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
            
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="mail@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?..."
                          className="min-h-[180px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full rounded-lg h-11 font-semibold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card> */}

      {/*       
        <Card className="max-w-xl mx-auto text-center py-10 animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              className="w-fit mx-auto mb-4"
              onClick={() => setView("selection")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
            <CardTitle className="text-3xl">Live Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoggedIn ? (
              <>
                <p className="text-muted-foreground">
                  Our engineers are online. Start a live chat now for immediate
                  assistance.
                </p>
                <Button size="lg" className="rounded-full px-10 gap-2">
                  <MessageCircle className="h-5 w-5" /> Start Chat Now
                </Button>
              </>
            ) : (
              <div className="bg-muted p-6 rounded-lg border-2 border-dashed">
                <p className="text-sm font-medium mb-4">
                  You must be logged in to access live support.
                </p>
                <Button variant="default">Sign In to Continue</Button>
              </div>
            )}
          </CardContent>
        </Card> */}
    </div>
  );
}

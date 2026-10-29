"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactSalesSchema, useContactSales } from "@/features/contact";
import { useState } from "react";

export default function ContactSales() {
  const form = useContactSales();
  const [isSending, setIsSending] = useState<boolean>(false);

  const onSubmit = async (values: ContactSalesSchema) => {
    setIsSending(true);
    console.log(values);
    setIsSending(false);
  };

  return (
    <Card className="max-w-7xl md:max-w-lg mx-5 md:mx-auto animate-in slide-in-from-bottom-4 duration-500 my-18 ">
      <CardHeader>
        <CardTitle className="text-3xl text-center mt-2">
          Contact Sales
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
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

            {/* Email Field */}
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

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How can we help you?..."
                      className="min-h-45 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-lg h-11 font-semibold mb-2"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

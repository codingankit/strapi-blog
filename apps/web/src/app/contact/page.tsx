"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Mail, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl min-h-150">
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
                Interested in a custom plan or enterprise features? Let&apos;s
                talk business.
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
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSalesSchema, ContactSalesSchema } from "./schemas";

export const useContactSales = () =>
  useForm<ContactSalesSchema>({
    resolver: zodResolver(contactSalesSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

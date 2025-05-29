"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const addressTypeEnum = z.enum(["Home", "Work", "Other"]);

const addressSchema = z.object({
  line1: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Street is required" }),
  line2: z.string().trim().toLowerCase().optional(),
  city: z.string().trim().toLowerCase().min(1, { message: "City is required" }),
  postalCode: z.string().trim().min(5, { message: "Postal code is required" }),
  state: z.string().min(2).max(2, { message: "Country is required" }),
  type: addressTypeEnum,
});

const signUpFormSchema = z
  .object({
    firstName: z.string().trim().toLowerCase().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().trim().toLowerCase().min(2, {
      message: "Last name must be at least 2 characters.",
    }),

    email: z.string().trim().toLowerCase().email({
      message: "Email address is invalid",
    }),

    password: z.string().trim().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirm: z.string().trim(),
    dateOfBirth: z.date().refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date",
    }),
    address: addressSchema,
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });
export function SignUpForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        postalCode: "",
        state: "",
        type: "Home",
      },
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
}

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
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { useState } from "react";

const addressTypeEnum = z.enum(["home", "work", "other"]);

const addressSchema = z.object({
  line1: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Street is required" }),
  line2: z.string().trim().toLowerCase().optional(),
  city: z.string().trim().toLowerCase().min(1, { message: "City is required" }),
  postalCode: z
    .string()
    .trim()
    .min(5)
    .max(10, { message: "Postal code is required" }),
  state: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(2, { message: "Country is required" }),
  type: addressTypeEnum,
});

const signUpFormSchema = z.object({
  firstName: z.string().trim().toLowerCase().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().trim().toLowerCase().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  email: z.string().trim().toLowerCase().email({
    message: "Email address is invalid",
  }),
  dateOfBirth: z.string().trim(),

  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters",
  }),
  //confirm: z.string().trim(),
  //dateOfBirth: z.date().refine((date) => !isNaN(date.getTime()), {
  //  message: "Invalid date",
  //}),
  address: addressSchema,
});
//.refine((data) => data.password === data.confirm, {
//  message: "Passwords don't match",
//  path: ["confirm"], // path of error
//});

export function SignUpForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      password: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        postalCode: "",
        state: "",
        type: "home",
      },
    },
  });

  const [signedUp, setSignedUp] = useState(false);
  const [userCombinedName, setUserCombinedName] = useState("");

  if (!signedUp) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input placeholder="01/01/2001" {...field} />
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

          <FormField
            control={form.control}
            name="address.line1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.line2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="Apt 4b" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="10004" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="home" />
                      </FormControl>
                      <FormLabel className="font-normal">Home</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="work" />
                      </FormControl>
                      <FormLabel className="font-normal">Work</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  }

  return (
    <div>
      <h4>Success! </h4>
      <p>Welcome {userCombinedName} </p>
    </div>
  );

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    console.log(values);
    let response = await fetch("http://localhost:5051/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 👈 sets the media type
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data.isSuccess) {
      setSignedUp(true);
      setUserCombinedName(data.result.firstName + " " + data.result.lastName);
    }
  }
}

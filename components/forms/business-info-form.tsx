"use client";

import useUserStore from "@/store/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { formatPhoneNumber } from "@/lib/utils";
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

import { H3, P } from "../shared/typography";
import PhoneInput from "../ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const businessInfoSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessPhoneNumber: z.string().min(8, "Please enter a valid phone number"),
  businessType: z.string().min(1, "Business Type is required"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  commercialRegistrationNumber: z
    .string()
    .min(1, "Commercial registration number is recommended")
    .optional()
    .or(z.literal("")),
  commercialRegistrationCertificate: z
    .string()
    .min(1, "Commercial registration certificate is required")
    .optional()
    .or(z.literal("")),
});

export type BusinessInfoValues = z.infer<typeof businessInfoSchema>;

interface BusinessInfoFormProps {
  onComplete: (data: any) => void;
}

export default function BusinessInfoForm({
  onComplete,
}: BusinessInfoFormProps) {
  const { user } = useUserStore();
  const form = useForm<BusinessInfoValues>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "",
      businessPhoneNumber: formatPhoneNumber(user?.phoneNumber, false) || "",
      businessType: "",
      email: "",
      commercialRegistrationNumber: "",
      commercialRegistrationCertificate: "",
    },
  });

  const onSubmit = async (data: BusinessInfoValues) => {
    onComplete({
      ...data,
      businessPhoneNumber: formatPhoneNumber(data.businessPhoneNumber),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <H3>Business Information</H3>
        <P className="text-muted-foreground">
          Please provide your business details
        </P>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Enter business phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Bussiness type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="cafe">Cafe</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter business email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commercialRegistrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Commercial Registration Number (optional but recommanded)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter registration number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commercialRegistrationCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Business Commercial Registration Certificate (optional)
                </FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

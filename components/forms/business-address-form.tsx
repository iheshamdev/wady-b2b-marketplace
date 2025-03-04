"use client";

import { format } from "path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/ui/phone-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { H3, Lead } from "../shared/typography";

const branchTypes = [
  "Retail",
  "Wholesale",
  "Distributor",
  "Manufacturer",
  "Restaurant",
  "Cafe",
  "Hotel",
  "Other",
] as const;

const cities = [
  "Doha",
  "Al Wakrah",
  "Al Khor",
  "Al Rayyan",
  "Umm Salal",
  "Al Daayen",
  "Al Shamal",
  "Al Shahaniya",
] as const;

const formSchema = z.object({
  branchName: z.string().min(2, {
    message: "Branch name must be at least 2 characters.",
  }),
  branchType: z.enum(branchTypes, {
    required_error: "Please select a branch type.",
  }),
  city: z.enum(cities, {
    required_error: "Please select a city.",
  }),
  zoneNumber: z.string().min(1, "Zone number is required."),
  streetNumber: z.string().min(1, "Street number is required."),
  buildingNumber: z.string().min(1, "Building number is required."),
  receiverName: z.string().min(2, {
    message: "Receiver name must be at least 2 characters.",
  }),
  receiverPhoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\d{8}$/,
      "Phone number must be a valid Qatar number (e.g., +974 12345678)",
    ),
  preferredDeliveryTime: z.enum(["morning", "evening"], {
    required_error: "Please select a delivery time.",
  }),
});

export default function AddressForm({
  onComplete,
}: {
  onComplete: (address: any) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchName: "",
      zoneNumber: "",
      streetNumber: "",
      buildingNumber: "",
      receiverName: "",
      receiverPhoneNumber: "",
      preferredDeliveryTime: "morning",
    },
  });

  function onSubmit(address: z.infer<typeof formSchema>) {
    onComplete({
      ...address,
      receiverPhoneNumber: formatPhoneNumber(address.receiverPhoneNumber),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <H3>Add Business Address</H3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="branchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch name</FormLabel>
                  <FormControl>
                    <Input placeholder="Branch Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branchType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Branch Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branchTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>Select a City</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="zoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Zone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Street Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Building Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver's Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Receiver's Contact Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiverPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver's Contact Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Receiver's Contact Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredDeliveryTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred delivery time</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">Morning</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">Evening</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

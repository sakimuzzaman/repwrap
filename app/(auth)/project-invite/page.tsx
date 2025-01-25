"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Validation Schema using Yup
const validationSchema = yup.object().shape({
  emails: yup
    .string()
    .required("Email address(es) are required")
    .test(
      "valid-emails",
      "Please provide valid email addresses separated by commas",
      (value) => {
        if (!value) return false;
        const emails = value.split(",").map((email) => email.trim());
        return emails.every((email) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );
      }
    ),
});

export default function OnboardingPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const emails = data.emails.split(",").map((email: any) => email.trim());

      // API request to send invites
      const response = await axiosInstance.post("/team/invite", { emails });
      console.log("Invites sent successfully:", response.data);

      // Reset the form on success
      reset();
      alert("Invitations sent successfully!");
    } catch (error) {
      console.error("Error sending invites:", error);
      alert("Failed to send invites. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl">
          Invite Teammates to <br /> your workspace
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-center">
              Teammate Email Address
            </h2>
            <Input
              placeholder="Enter email address or paste multiple"
              className="text-center"
              {...register("emails")}
            />
            {errors.emails && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errors.emails.message}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <Button
              className="w-[124px]"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Continue"}
            </Button>

            <Button
              className="w-[124px] bg-gray-400"
              size="lg"
              type="button"
              onClick={() => reset()}
            >
              Skip
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}

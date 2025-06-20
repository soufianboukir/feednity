'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { InputOtp } from "./ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resendCode, verifyCode } from "@/services/auth";

export function EmailVerificationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const email = typeof window !== 'undefined' ? localStorage.getItem("email") : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!otp || otp.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    if (!email) {
      setError("Missing email. Please register again.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyCode(email,otp);

      if (response.status === 200) {
        setSuccess("Your email has been verified successfully!");
        localStorage.removeItem('email')
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(response.data.message || "Invalid code");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        setError(axiosError.response?.data?.error || "Network error. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email) {
      setError("Missing email.");
      return;
    }

    setError(null);
    setSuccess(null);
    setResending(true);

    try {
      const response = await resendCode(email)

      if (response.status === 200) {
        setSuccess("Verification code resent to your email.");
      } else {
        setError(response.data.message || "Failed to resend code.");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        setError(axiosError.response?.data?.error || "Network error. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription>
            We{"'"}ve sent a 6-digit code to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <div className="flex gap-2 justify-center">
                  <InputOtp value={otp} onChange={setOtp} />
                </div>
                <p className="text-muted-foreground text-xs">
                  Didn{"'"}t receive a code?{" "}
                  <button
                    type="button"
                    className="underline"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? "Resending..." : "Resend"}
                  </button>
                </p>
              </div>

              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              {success && <p className="text-green-600 text-sm text-center">{success}</p>}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="text-center text-sm">
                <Link href="/login" className="underline underline-offset-4">
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

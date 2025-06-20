import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function EmailVerificationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <div className="flex gap-2 justify-center">
                  {[...Array(6)].map((_, i) => (
                    <Input
                      key={i}
                      id={`code-${i}`}
                      type="text"
                      maxLength={1}
                      className="text-center h-12 w-12"
                      required
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs">
                  Didn{"'"}t receive a code? <a href="#" className="underline">Resend</a>
                </p>
              </div>
              <Button type="submit" className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700">
                Verify Email
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
  )
}
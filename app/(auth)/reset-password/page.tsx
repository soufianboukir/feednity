
import { ResetPasswordForm } from "@/components/resetpassword-form"
import LogoTop from "@/components/logo-top"

export default function LoginPage() {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-md flex-col gap-6">
          <LogoTop />
          <ResetPasswordForm />
        </div>
      </div>
    )
}

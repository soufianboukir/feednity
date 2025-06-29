
import { LoginForm } from "@/components/login-form"
import LogoTop from "@/components/logo-top"
import { Suspense } from "react"

export default function LoginPage() {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-md flex-col gap-6">
          <LogoTop />
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    )
}

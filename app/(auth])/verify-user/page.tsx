import { EmailVerificationForm } from '@/components/emailverification-form'
import LogoTop from '@/components/logo-top'
import React from 'react'

export default function page() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <LogoTop />
                <EmailVerificationForm />
            </div>
        </div>
    )
}
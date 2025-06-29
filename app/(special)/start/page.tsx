'use client'

import { CheckCircle } from 'lucide-react'

const steps = [
  {
    title: '1. Register Your Account',
    description: 'Sign up with your business email and create a secure password to access your dashboard.',
  },
  {
    title: '2. Create Your Business Profile',
    description:
      'Enter details about your business such as name, location, type, and contact information.',
  },
  {
    title: '3. Generate Your QR Code',
    description:
      'After completing your profile, the system automatically generates a unique QR code and feedback link.',
  },
  {
    title: '4. Print and Display the QR Code',
    description:
      'Download and print the QR code. Place it in visible areas like tables, receipts, or doors.',
  },
  {
    title: '5. Start Collecting Feedback',
    description:
      'Customers scan the QR code, rate your service, and submit comments. No login required for them.',
  },
  {
    title: '6. Analyze Feedback in Real-Time',
    description:
      'Use the dashboard to view ratings, read comments, and access insights to improve your business.',
  },
]

export default function GettingStartedPage() {
  return (
        <main className="px-6 py-16">
            <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-12">
                Follow these simple steps to set up and start collecting customer feedback instantly.
            </p>

            <div className="space-y-10">
                {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </main>
  )
}

'use client'

import Link from 'next/link'

export default function NotFound() {
return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="mb-6 text-gray-600">The page you are looking for does not exist.</p>
        <Link href="/">
            <span className="text-blue-600 hover:underline">Go back home</span>
        </Link>
    </div>
  )
}

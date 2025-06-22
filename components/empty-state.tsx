"use client"

import { Building2 } from "lucide-react"


export function EmptyState() {
  return (
    <div 
      className="flex flex-col items-center mt-20 justify-center text-center p-8 gap-6 transition-colors cursor-pointer"
    >
      <div className="p-4 rounded-full bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
        <Building2 className="w-10 h-10" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          No businesses yet
        </h2>
        <p className="text-muted-foreground text-sm">
          Create your first business to start collecting customer feedback through QR codes & links.
        </p>
      </div>
    </div>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Plus } from "lucide-react"

interface EmptyStateProps {
  onCreateClick: () => void
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 gap-6">
      <Image
        src="/empty-illustration.png"
        alt="No businesses"
        width={200}
        height={200}
        className="opacity-80"
      />
      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-semibold">No businesses yet</h2>
        <p className="text-muted-foreground text-sm">
          Create your first business to start collecting customer feedback through QR codes & links.
        </p>
      </div>
      <Button onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
        <Plus className="mr-2 h-4 w-4" />
        Create Business
      </Button>
    </div>
  )
}

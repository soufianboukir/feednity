import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, QrCode } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Card } from "./ui/card"
import Link from "next/link"

export function BusinessLinkBanner({ businessLink }: { businessLink: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(businessLink)
    setCopied(true)
    toast.success("Link copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="@container/card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 mx-6">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Your business feedback form link</span>
        <Input
          value={businessLink}
          readOnly
          className="mt-1 w-full md:w-[420px] text-sm font-mono bg-background"
        />
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline" onClick={handleCopy}>
          {copied ? <>
            <Check  className="w-4 h-4 mr-2"/> copied
          </> : <>
            <Copy className="w-4 h-4 mr-2"/> Copy link
          </>}
        </Button>
        <Link href={'/qr'}>
            <Button variant="default" className="bg-blue-600 cursor-pointer dark:bg-white hover:bg-blue-700">
                <QrCode className="w-4 h-4 mr-2" />
                Show QR
            </Button>
        </Link>
      </div>
    </Card>
  )
}

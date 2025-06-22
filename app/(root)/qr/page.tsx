"use client"

import React, { useRef, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { EmptyState } from "@/components/empty-state"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useActiveBusiness } from "@/stores/business-store"
import { QRCodeSVG } from 'qrcode.react'
import { Check, Copy, Printer } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function Page() {
  const { activeBusiness } = useActiveBusiness()
  const qrRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  
  const feedbackLink = `https://yourdomain.com/feedback/${activeBusiness?._id || "demo"}`

  const handleCopy = () => {
    navigator.clipboard.writeText(feedbackLink)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    if (!qrRef.current) return
    const printWindow = window.open('', '', 'width=600,height=600')
    printWindow?.document.write(`
      <html>
        <head>
          <title>QR Code - ${activeBusiness?.name || "Your Business"}</title>
          <style>
            body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .qr-container { padding: 2rem; text-align: center; }
            .business-name { font-size: 1.5rem; margin-bottom: 1rem; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="business-name">${activeBusiness?.name || "Your Business"} - Scan to let a feedback</div>
            ${qrRef.current.innerHTML}
          </div>
        </body>
      </html>
    `)
    printWindow?.document.close()
    printWindow?.focus()
    setTimeout(() => {
      printWindow?.print()
    }, 200)
  }

  if (!activeBusiness) {
    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader pageName="QrCode & link"/>
          <EmptyState />
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader pageName="QrCode & link"/>

        <div className="max-w-md mx-auto mt-10 p-8 rounded-xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Feedback QR Code for {activeBusiness.name}
          </h2>

          <div className="mb-6">
            <div ref={qrRef} className="inline-block p-4 bg-white rounded-lg">
              <QRCodeSVG
                value={feedbackLink}
                size={200}
                fgColor="#000000" 
                bgColor="#ffffff"
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          <div className="mb-6 p-3 bg-blue-100 rounded-lg dark:bg-gray-900">
            <p className="text-blue-500 break-all select-all font-mono text-sm">
              {feedbackLink}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white rounded-lg transition-all dark:text-black"
            >
              <Printer className="w-4 h-4" />
              Print QR
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
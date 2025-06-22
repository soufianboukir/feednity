"use client"

import { CheckCircle, Star, BarChart, Download, Repeat, ListChecks, Reply, LucideIcon } from "lucide-react"
import Link from "next/link"

export default function UpgradePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 px-4 py-12">
      <div className="max-w-3xl w-full bg-gray-900 shadow-2xl rounded-2xl p-8 space-y-8 border border-gray-800">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Upgrade to Pro
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Unlock powerful tools to grow your business with better insights and automation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Feature icon={BarChart} title="Analytics / Insights" />
          <Feature icon={Download} title="Export Feedback" />
          <Feature icon={Repeat} title="Automations" />
          <Feature icon={ListChecks} title="Custom Questions" />
          <Feature icon={Reply} title="Saved Responses" />
          <Feature icon={Star} title="Priority Inbox (soon)" />
        </div>

        <div className="text-center pt-6">
          <p className="text-xl font-semibold text-white">Only <span className="text-blue-400">$12/month</span></p>
          <p className="text-sm text-gray-400">(or $100/year — save 30%)</p>

          <Link
            href="/billing"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-start gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-blue-400/30 transition-colors">
      <CheckCircle className="text-blue-400 mt-0.5 w-5 h-5" />
      <div className="flex items-center gap-2 text-gray-100">
        <Icon className="w-4 h-4 text-blue-400" />
        <span className="text-sm">{title}</span>
      </div>
    </div>
  )
}
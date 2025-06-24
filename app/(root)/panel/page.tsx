'use client'

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { EmptyState } from "@/components/empty-state"
import { useActiveBusiness } from "@/stores/business-store"
import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { BusinessLinkBanner } from "@/components/business-link-banner"
import Loading from "@/components/loading"

export default function DashboardPage() {
  const { activeBusiness } = useActiveBusiness()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    totalFeedbacks: 0,
    lastFeedback: null,
    recentCount: 0,
    averageRating: 0,
    perDayFeedbacks: [],
    ratingBreakdown: [],
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/dashboard?businessId=${activeBusiness?._id}`)
        const result = await res.json()
        setData(result)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (activeBusiness) fetchAnalytics()
  }, [activeBusiness])

  if (!activeBusiness) return <EmptyState />
  if (loading) return <Loading message="Loading your dashboard data..."/>
  if(!loading && activeBusiness && data.totalFeedbacks === 0) return <>
              <EmptyState title="No feedbacks yet" detail="Start collecting feedback by sharing your form link or QR code with customers." />
              <BusinessLinkBanner businessLink={process.env.NEXT_PUBLIC_APP_URL+"/feedback/"+activeBusiness.feedbackSlug} />
  </>

  const { totalFeedbacks, lastFeedback, recentCount, averageRating, perDayFeedbacks } = data

  return (
    <div className="space-y-6">
      <SiteHeader pageName="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <BusinessLinkBanner businessLink={process.env.NEXT_PUBLIC_APP_URL+"/feedback/"+activeBusiness.feedbackSlug}/>

              <SectionCards lastFeedback={lastFeedback} avgRating={averageRating} totalFeedbacks={totalFeedbacks} totalFeedbacksLastweek={recentCount}/>
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive feedbacksPerDay={perDayFeedbacks}/>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

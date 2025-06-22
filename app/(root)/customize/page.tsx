'use client'

import FeedbackPage1 from "@/components/feedbacks/feedback-1"
import FeedbackPage2 from "@/components/feedbacks/feedback-2"
import FeedbackPage3 from "@/components/feedbacks/feedback-3"
import FeedbackPage4 from "@/components/feedbacks/feedback-4"
import { SiteHeader } from "@/components/site-header"
import { useActiveBusiness } from "@/stores/business-store"


export default function Page() {
  const { activeBusiness } = useActiveBusiness()
  
  return (
    <div>
        <SiteHeader pageName="Customization"/>
        <div className="grid grid-cols-3">
          <FeedbackPage1 />
          <FeedbackPage2 />
          <FeedbackPage3 />
          <FeedbackPage4 />
        </div>
    </div>
  )
}


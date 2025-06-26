import { IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Feedback } from "@/types";

type SectionCardProps = {
  avgRating: number;
  lastFeedback: Feedback | null;
  totalFeedbacks: number;
  totalFeedbacksLastweek: number
}

export function SectionCards({avgRating, lastFeedback, totalFeedbacks, totalFeedbacksLastweek}: SectionCardProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="bg-blue-50">
        <CardHeader>
          <CardDescription>Total Feedbacks</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalFeedbacks}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
          Feedback from users collected across all channels
          </div>
          <div className="text-muted-foreground">
          Includes forms, ratings, and comments
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-blue-50">
        <CardHeader>
          <CardDescription>Most Recent Feedback</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl truncate">
            {lastFeedback?.rating} by <span className="max-w-lg text">{lastFeedback?.name || 'unknown'}</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              Latest Entry
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Capturing real-time user sentiment
          </div>
          <div className="text-muted-foreground">
            Pulled from your latest feedback entry
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-blue-50">
        <CardHeader>
          <CardDescription>Feedbacks Last Week</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalFeedbacksLastweek}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              Weekly Total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Feedback collected during the past week
          </div>
          <div className="text-muted-foreground">
            Aggregated from all active channels
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-blue-50">
        <CardHeader>
          <CardDescription>Average Feedback Rating</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {avgRating} / 5
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Reflects overall user satisfaction
          </div>
          <div className="text-muted-foreground">
            Calculated from star ratings
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

import { Result, sendSummaryEmail } from "@/lib/mail"
import { getWeeklyFeedbacks } from "@/lib/weeklyFeedbacks"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        const summaries:Result[] | undefined = await getWeeklyFeedbacks()
        
        if(summaries){
            for (const summary of summaries) {
                if(summary.ownerTier === 'pro'){
                    await sendSummaryEmail(summary)
                }
            }
        }

        return NextResponse.json({ success: true ,summaries})
    } catch{
        
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

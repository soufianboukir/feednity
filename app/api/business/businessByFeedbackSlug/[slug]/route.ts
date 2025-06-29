import { NextRequest, NextResponse,RequestEvent } from 'next/server'
import businessModel from '@/models/business.model'

export async function GET(req: NextRequest, event: RequestEvent) {
    const { slug } = event.params;

    try {
        const business = await businessModel.findOne({ feedbackSlug:slug })
        
        if (!business) {
            return NextResponse.json({ error: 'Business not found' }, { status: 404 })
        }

        return NextResponse.json({ business })
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

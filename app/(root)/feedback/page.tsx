'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { format } from 'date-fns'
import { Feedback } from '@/types'
import { DatePicker } from '@/components/ui/date-picker'
import { useActiveBusiness } from '@/stores/business-store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { SiteHeader } from '@/components/site-header'
import Loading from '@/components/loading'
import { FeedbackDialog } from '@/components/feedback-details'
import { feedbackPageData } from '@/services/feedback'

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const { activeBusiness } = useActiveBusiness()

    const [rating, setRating] = useState<string | undefined>()
    const [dateFrom, setDateFrom] = useState<Date | undefined>()
    const [dateTo, setDateTo] = useState<Date | undefined>()

    const businessId = activeBusiness?._id

    useEffect(() => {
        const fetchFeedbacks = async () => {
            if (!businessId) return
    
            setLoading(true)
            try {
                const query = new URLSearchParams()
                query.set('businessId', businessId)
                query.set('page', String(page))
                if (rating) query.set('rating', rating)
                if (dateFrom) query.set('dateFrom', dateFrom.toISOString())
                if (dateTo) query.set('dateTo', dateTo.toISOString())
    
                const response = await feedbackPageData(query.toString())
                if (response.status === 200) {
                    setFeedbacks(response.data.feedbacks)
                    setTotalPages(response.data.totalPages)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    
        fetchFeedbacks()
    }, [businessId, page, rating, dateFrom, dateTo]) 

    if(loading) return <Loading message='Loading your feedbacks...'/>

  return (
    <div>
        <SiteHeader pageName='Feedbacks'/>
        <div className="p-6 space-y-6 mx-auto">
        <h1 className="text-2xl font-semibold">Feedback Responses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div className='flex flex-col gap-2'>
                    <Label>Rating</Label>
                    <Select value={rating} onValueChange={setRating}>
                        <SelectTrigger>
                            <SelectValue placeholder="All ratings" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 stars</SelectItem>
                            <SelectItem value="4">4 stars</SelectItem>
                            <SelectItem value="3">3 stars</SelectItem>
                            <SelectItem value="2">2 stars</SelectItem>
                            <SelectItem value="1">1 star</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>From</Label>
                    <DatePicker date={dateFrom} setDate={setDateFrom} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>To</Label>
                    <DatePicker date={dateTo} setDate={setDateTo} />
                </div>
            <div>
            <Button
                className="bg-blue-600 hover:bg-blue-700 lg:float-right cursor-pointer"
                onClick={() => {
                setRating(undefined)
                setDateFrom(undefined)
                setDateTo(undefined)
                }}
            >
                Reset Filters
            </Button>
            </div>
        </div>

        {loading ? (
            <Loading message='Loading your feedbacks...'/>
        ) : feedbacks.length === 0 ? (
            <div className="text-muted-foreground">No feedbacks found.</div>
        ) : (
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>Name</TableHead>
                            <TableHead className='text-center'>Email</TableHead>
                            <TableHead className='text-center'>Rating</TableHead>
                            <TableHead className='text-center'>Comment</TableHead>
                            <TableHead className='text-center'>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feedbacks.map((fb) => (
                            <TableRow key={fb._id}>
                                <TableCell className='max-w-xs truncate  text-center'>{fb.name || 'Anonymous'}</TableCell>
                                <TableCell className='max-w-xs truncate  text-center'>{fb.email || '—'}</TableCell>
                                <TableCell className='text-center'>{fb.rating} ⭐</TableCell>
                                <TableCell className="max-w-xs truncate text-center">
                                    {fb.comment || '—'}
                                </TableCell>
                                <TableCell className='text-center'>{format(new Date(fb.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                                <TableCell className='text-center'>
                                    <FeedbackDialog feedback={fb}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )}

        <div className="flex justify-between items-center mt-6">
            <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className='bg-blue-600 hover:bg-blue-600 dark:bg-blue-200 dark:hover:bg-blue-300 cursor-pointer'>
                Previous
            </Button>
            <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
            </span>
            <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className='bg-blue-600 hover:bg-blue-600 dark:bg-blue-200 hover:dark:bg-blue-300 cursor-pointer'>
                Next
            </Button>
        </div>
        </div>
    </div>
  )
}

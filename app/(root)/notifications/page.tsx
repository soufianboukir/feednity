'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BellOff, Building2, CheckCircle2, ChevronLeft, ChevronRight, Clock, Mail, MailOpen } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import Loading from '@/components/loading'
import { toast } from 'sonner'
import { getNotificationsPagination, markNotificationsAsRead } from '@/services/notification'

type Notification = {
  _id: string
  message: string
  isRead: boolean
  createdAt: string
  business?: {
    name: string
    logo?: string
    slug?: string
  }
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchNotifications = async (page: number) => {
        setLoading(true)
        try {
            const response = await getNotificationsPagination(page)
            if(response.status === 200){
                setNotifications(response.data.notifications)
                setPage(response.data.page)
                setTotalPages(response.data.totalPages)
            }
        } catch (error) {
        console.error('Failed to load notifications:', error)
        } finally {
        setLoading(false)
        }
    }

    const markAllAsRead = async () =>{
            toast.promise(markNotificationsAsRead(),{
                loading: "...Loading",
                success: () => {
                    const newNotifications = notifications.map((notification) => ({
                        ...notification,
                        isRead: true,
                      }))
                    setNotifications(newNotifications);
                    return "Succesfully marked as read"
                },
                error: (err) => err.response.data.message
            })
        }
    useEffect(() => {
        fetchNotifications(page)
    }, [page])

    if (loading) return <Loading message='Loading your notifications...'/>

  return (
    <div>
        <SiteHeader pageName='Notifications'/>
        <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Notifications</h1>
            <Button 
            variant="ghost" 
            onClick={markAllAsRead}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
            <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark all as read
            </Button>
        </div>

        <div className="space-y-3">
            {notifications.length === 0 ? (
                <div className="text-center py-12">
                    <BellOff className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 font-medium">No notifications yet</p>
                    <p className="text-sm text-gray-400 mt-1">We{"'"}ll notify you when something arrives</p>
                </div>
                ) : (
                notifications.map((n) => (
                    <div
                    key={n._id}
                    className={`
                        relative p-4 rounded-lg transition-all
                    `}
                    >
                    {!n.isRead && (
                        <span className="absolute top-3 left-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                        <div className="flex items-start">
                            {n.isRead ? (
                            <MailOpen className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                            ) : (
                            <Mail className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                            )}
                            <div className="flex-1">
                            <p className={`text-sm ${n.isRead ? 'text-gray-700 dark:text-gray-200' : 'font-medium text-gray-900 dark:text-gray-100'}`}>
                                {n.message}
                            </p>
                            {n.business && (
                                <div className="flex items-center mt-2">
                                <Building2 className="w-3 h-3 text-gray-400 mr-1" />
                                <span className="text-xs text-gray-500">Related to: {n.business.name}</span>
                                </div>
                            )}
                            <div className="flex items-center mt-2 text-xs text-gray-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(n.createdAt).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

            {notifications.length > 0 && (
                <div className="flex items-center justify-between mt-8 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="gap-1"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                            variant={page === i + 1 ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setPage(i + 1)}
                            className="w-8 h-8 p-0 bg-blue-400"
                        >
                            {i + 1}
                        </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="gap-1"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    </div>
  )
}

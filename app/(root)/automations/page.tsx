"use client"

import Loading from "@/components/loading"
import { SiteHeader } from "@/components/site-header"
import { SwitchToggle } from "@/components/ui/switch-toggle"
import { useActiveBusiness } from "@/stores/business-store"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"
import { updateAutomations } from "@/services/automations"

const AutomationSettings = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { activeBusiness } = useActiveBusiness()
    const [automations, setAutomations] = useState(activeBusiness?.automations || {})

    useEffect(() => {
        if (activeBusiness?.automations) {
            setAutomations(activeBusiness.automations)
        }
    }, [activeBusiness])

    const handleToggle = async (key: keyof typeof automations) => {
        const updatedValue = !automations[key]
        const updated = { ...automations, [key]: updatedValue }

        try {
            await axios.patch(`/api/business/${activeBusiness?._id}/automations`, {
                key,
                value: updatedValue,
        })
        if(!activeBusiness) return;
        toast.promise(updateAutomations({key,value:updatedValue},activeBusiness?._id),{
            loading: 'loading...',
            success: (res) => res.data.message,
            error: (err) => err.response.data.message
        })

        setAutomations(updated)
        } catch {
            toast.error("Failed to update automation")
        }
    }

    if (status === "loading") return <Loading message="Loading automation settings..." />
    if (session?.user.plan === "free") return router.push("/upgrade-to-pro")

    return (
        <div>
            <SiteHeader pageName="Automations" />
            <div className="p-6 space-y-6 mx-auto">
                <h1 className="text-2xl font-semibold">Automation Settings</h1>

                {[
                {
                    key: "lowRatingEmail",
                    label: "Alert me on my mail if the rating is less than 3 stars",
                    disabled: false,
                },
                {
                    key: "weeklySummaryEmail",
                    label: "Automatically summarize feedbacks every week and sends alerts to my mail",
                    disabled: false,
                },
                {
                    key: "autoReplyWithMessage",
                    label: "Auto-reply to submitted feedback contains email with a message set by me",
                    disabled: true,
                },
                {
                    key: "weeklyPerformanceCompare",
                    label: "Auto-compare weekly performance",
                    disabled: true,
                },
                ].map(({ key, label, disabled }) => (
                    <div
                        key={key}
                        className="flex items-center justify-between py-3 border-b border-muted"
                    >
                        <span className="text-muted-foreground flex items-center">
                            {label}{
                            disabled && <span className="bg-blue-500 text-white rounded-lg ml-4 px-3 py-1">coming soon</span>}
                        </span>
                        <label className="inline-flex items-center cursor-pointer">
                        
                            <input
                                type="checkbox"
                                checked={automations[key as keyof typeof automations] || false}
                                disabled={disabled}
                                onChange={() =>
                                !disabled && handleToggle(key as keyof typeof automations)
                                }
                                className="sr-only peer"
                            />
                            <div className="flex gap-2 items-center">
                                <SwitchToggle
                                isEnabled={automations[key as keyof typeof automations] || false}
                                setIsEnabled={
                                    disabled
                                    ? () => {}
                                    : (value: boolean) =>
                                        handleToggle(key as keyof typeof automations, value)
                                }
                                />
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AutomationSettings

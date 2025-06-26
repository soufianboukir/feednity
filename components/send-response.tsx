"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Feedback } from "@/types"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { Label } from "./ui/label"

export function SendResponse({ feedback }: { feedback: Feedback }) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const { data: session } = useSession()
  const [from,setFrom] = useState(session?.user.email)
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!feedback.email || !message.trim()) {
      toast.error("Email and message are required.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/feedback/send-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: feedback.email,
          subject: subject || "Reply to your feedback",
          text: message,
          from,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to send email")
      }

      toast.success("Response sent successfully!")
      setSubject("")
      setMessage("")
    } catch {
      toast.error("Failed to send response.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="inline-flex items-center justify-center text-blue-600 hover:text-blue-700 hover:underline p-0 text-sm font-medium cursor-pointer transition-colors duration-150 ease-in-out">
            Send response
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40%] w-[90%] max-w-[95%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Send response
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Submitted on{" "}
            {format(new Date(feedback.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">Name:</span>
            <span className="col-span-3 text-gray-900 dark:text-gray-100 break-words">
              {feedback.name || <span className="text-gray-400">Anonymous</span>}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">Email:</span>
            <span className="col-span-3 text-gray-900 dark:text-gray-100 break-words">
              {feedback.email || <span className="text-gray-400">—</span>}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">Rating:</span>
            <div className="col-span-3">
              <Badge 
                variant="outline" 
                className="text-yellow-600 dark:text-yellow-400 border-yellow-600 dark:border-yellow-400 px-2 py-1 rounded-full"
              >
                {feedback.rating} ⭐
              </Badge>
            </div>
          </div>

          {feedback.comment && (
            <div className="grid grid-cols-4 gap-4">
              <span className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">Comment:</span>
              <p className="col-span-3 text-gray-700 dark:text-gray-300 p-3 rounded-md break-words">
                {feedback.comment}
              </p>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
                <Label className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">
                From email:
                </Label>
                <Input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Optional Email"
                className="col-span-3"
                />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">
              Subject:
            </Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Optional subject"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">
              Message:
            </Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="col-span-3 min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? "Sending..." : "Send Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

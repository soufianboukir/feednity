"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "../ui/button"

export default function FeedbackPage1({ params }: { params: { slug?: string } }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      toast.error("Please give a rating and comment.")
      return
    }

    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ slug: params.slug, rating, comment }),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      toast.success("Thanks for your feedback!")
      router.push("/thank-you")
    } else {
      toast.error("Failed to submit feedback.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-xl border shadow">
      <h1 className="text-xl font-semibold mb-4 text-center">How was your experience?</h1>

      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setRating(num)}
            className={`cursor-pointer text-3xl ${rating >= num ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        rows={4}
        placeholder="Write your feedback..."
        className="w-full p-3 border rounded mb-4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
        Submit Feedback
      </Button>
    </div>
  )
}

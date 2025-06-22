"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function FeedbackPage3({ params }: { params: { slug: string } }) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please rate before submitting.")

    await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ slug: params.slug, rating, comment }),
      headers: { "Content-Type": "application/json" },
    })

    setSubmitted(true)
    toast.success("Thanks for your feedback!")
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <Image src="/success.svg" width={100} height={100} alt="Success" />
        <h2 className="text-xl font-semibold mt-6">Feedback Received!</h2>
        <p className="text-muted-foreground mt-2">We appreciate your input.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <Image src="/your-logo.png" alt="Logo" width={48} height={48} className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold tracking-tight">Rate your experience</h1>
        <p className="text-muted-foreground text-sm">We'd love to hear how we did.</p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(i)}
            className={`w-8 h-8 cursor-pointer transition-transform ${
              (hovered || rating) >= i ? "text-yellow-400 scale-110" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <textarea
        placeholder="Optional comment..."
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
      >
        Submit Feedback
      </button>
    </div>
  )
}

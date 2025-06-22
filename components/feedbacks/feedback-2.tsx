"use client"

import { useState } from "react"
import { toast } from "sonner"

const emojis = [
  { icon: "😠", label: "Very Bad" },
  { icon: "😕", label: "Bad" },
  { icon: "😐", label: "Okay" },
  { icon: "😊", label: "Good" },
  { icon: "😍", label: "Excellent" },
]

export default function FeedbackPage2({ params }: { params: { slug: string } }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

  const handleSubmit = async () => {
    if (selected === null) {
      toast.error("Select an emoji rating")
      return
    }

    await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        slug: params.slug,
        emoji: emojis[selected].label,
        name,
        comment,
      }),
      headers: { "Content-Type": "application/json" },
    })

    toast.success("Thanks for your feedback!")
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow text-center">
      <h2 className="text-lg font-bold mb-4">How did we do?</h2>

      <div className="flex justify-center gap-4 text-3xl mb-6">
        {emojis.map((e, i) => (
          <button
            key={i}
            className={selected === i ? "scale-125" : "opacity-50"}
            onClick={() => setSelected(i)}
            title={e.label}
          >
            {e.icon}
          </button>
        ))}
      </div>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Additional comments"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
      >
        Submit
      </button>
    </div>
  )
}

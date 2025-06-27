"use client"

import { FormEvent, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { CircleCheckBig, Star } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { FeedbackForm, submitFeedback } from "@/services/feedback"
import { Question } from "@/interface"
import { Label } from "./ui/label"

const emojis = [
  { icon: "😠", label: "Very Bad" },
  { icon: "😕", label: "Bad" },
  { icon: "😐", label: "Okay" },
  { icon: "😊", label: "Good" },
  { icon: "😍", label: "Excellent" },
]

interface FeedbackProps {
  variant?: "stars" | "emojis" | "select"
  submit?: boolean
  businessName?: string
  businessLogo?: string
  businessQuestions?: Question[]
  selectedForm?: string
  setSelectedForm?: (selectedForm: "stars" | 'emojis' | 'select') => void
  feedbackSlug?: string
}

export default function UnifiedFeedback({
  variant,
  submit,
  businessName,
  businessLogo,
  businessQuestions,
  selectedForm,
  setSelectedForm,
  feedbackSlug
}: FeedbackProps) {
  const [rating, setRating] = useState<string>('0')
  const [hovered, setHovered] = useState<number>(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading,setLoading] = useState(false)
  const [questionResponses, setQuestionResponses] = useState<Record<string, string[] | string>>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (rating === '0') {
      toast.error("Please provide a rating.")
      return
    }

    if (!submit) {
      toast.success("Submitted successfully")
      setSubmitted(true)
    }

    if (submit && businessQuestions) {
      const invalid = businessQuestions.some(q => {
        const answer = questionResponses[q.label]
        if (q.required) {
          if (q.type === 'text') {
            return !answer || (answer as string).trim() === ""
          } else if (q.type === 'multiple-choice') {
            return !Array.isArray(answer) || answer.length === 0
          }
        }
        return false
      })
      if (invalid) {
        toast.error("Please answer all required questions.")
        return
      }
    }

    
    const questionEntries =
    businessQuestions?.map(q => ({
      label: q.label,
      response: questionResponses[q.label] || (q.type === "multiple-choice" ? [] : ""),
    })) || []

    const payload: FeedbackForm = {
      rating: variant === "emojis" ? emojis[parseInt(rating) - 1]?.label || "" : rating,
      name,
      email,
      comment,
      questions: questionEntries,
    }
    try{
      setLoading(true)
      const response = await submitFeedback(payload,feedbackSlug!)
      if(response.status === 200){
        setSubmitted(true)
      }
    }catch{
      toast.error('An error occured pleaese try again')
    }finally{
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <CircleCheckBig className="text-green-600 w-20 h-20" />
        <h2 className="text-xl font-semibold mt-6">Feedback Received!</h2>
        <p className="text-muted-foreground mt-2">We appreciate your input.</p>
      </div>
    )
  }

  return (
    <div className={`mt-10 ${submit && 'lg:w-[40%] w-[80%] mx-auto'} p-6 border rounded-xl shadow text-center ${selectedForm === variant ? "border-blue-400 border-2 shadow-lg" : "border-gray-300"}`}>
      {businessLogo && (
        <div className="flex justify-center mb-2">
          <Image src={businessLogo} alt="business logo" width={100} height={100} />
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-4">{businessName}</h1>
      <h2 className="text-lg font-bold mb-4">How was your experience?</h2>

      {variant === "select" && (
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Select your experience</SelectItem>
            <SelectItem value="1">Very Bad</SelectItem>
            <SelectItem value="2">Bad</SelectItem>
            <SelectItem value="3">Okay</SelectItem>
            <SelectItem value="4">Good</SelectItem>
            <SelectItem value="5">Excellent</SelectItem>
          </SelectContent>
        </Select>
      )}

      {variant === "stars" && (
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(i.toString())}
              className={`w-8 h-8 cursor-pointer transition-transform ${
                (hovered || parseInt(rating)) >= i ? "text-yellow-400 scale-110" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {variant === "emojis" && (
        <div className="flex justify-center gap-4 text-3xl mb-6">
          {emojis.map((e, i) => (
            <button
              key={i}
              className={parseInt(rating) === i + 1 ? "scale-125" : "opacity-50"}
              onClick={() => setRating((i + 1).toString())}
              title={e.label}
            >
              {e.icon}
            </button>
          ))}
        </div>
      )}

      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        <Label>Your name (optional)</Label>
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Your email (optional)</Label>
        <Input
          type="email"
          placeholder="Your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        

        {
          submit && businessQuestions?.map((q, index) => (
            <div key={index} className="mb-4">
              <Label>
                {q.label} {q.required ? "(required)" : "(optional)"}
              </Label>

              {q.type === 'text' ? (
                <Textarea
                  placeholder="Your answer"
                  required={q.required}
                  className="mt-2"
                  value={questionResponses[q.label] || ""}
                  onChange={(e) => setQuestionResponses(prev => ({ ...prev, [q.label]: e.target.value }))}
                />
              ) : q.type === 'multiple-choice' && q.options ? (
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <Label key={i} className="flex items-center space-x-2 mt-3">
                      <input
                        type="checkbox"
                        name={`option-${index}`}
                        value={opt}
                        checked={Array.isArray(questionResponses[q.label]) && questionResponses[q.label].includes(opt)}
                        onChange={(e) => {
                          const checked = e.target.checked
                          setQuestionResponses(prev => {
                            const existing = (prev[q.label] as string[]) || []
                            return {
                              ...prev,
                              [q.label]: checked
                                ? [...existing, opt]
                                : existing.filter(o => o !== opt),
                            }
                          })
                        }}
                      />
                      <span>{opt}</span>
                    </Label>
                  ))}
                </div>
              ) : null}
            </div>
          ))
        }

        <Label>Your feedback</Label>
        <Textarea
          placeholder="Additional comments"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows={4}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition" disabled={loading}>
          {
            loading ? 
              '...Loading'
            : 'Submit feedback'
          }
        </Button>
  
        {
          !submit && (
            <div className="mt-4 flex justify-center items-center">
              <input
                type="radio"
                name="feedback-form"
                value={variant}
                checked={selectedForm === variant}
                onChange={(e) => setSelectedForm?.(e.target.value as 'select' | 'stars' | 'emojis')}
                className="cursor-pointer"
              />
              <label className="ml-2 text-sm capitalize">{variant}</label>
          </div>
          )
        }
      </form>
    </div>
  )
}

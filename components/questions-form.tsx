"use client"

import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { Question } from '@/interface'
import { addQuestion, updateQuestion } from '@/services/questions'


interface QuestionsFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  businessId: string | undefined
  questions: Question[]
  onUpdateAdded: (newQuestions: Question[]) => void
  question?: Question
  update:boolean
}

export function QuestionsForm({
  open,
  onOpenChange,
  businessId,
  questions: initialQuestions,
  onUpdateAdded,
  question,
  update
}: QuestionsFormProps) {
    const [questions, setQuestions] = useState<Question[]>([])
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [form, setForm] = useState<Question>({
        label: question?.label || '',
        type: question?.type || 'text',
        required: question?.required || false,
        order: question?.order || questions.length + 1,
        options: question?.options || [],
    })
    

    const resetForm = () => {
        setForm({ label: '', type: 'text', required: false, order: questions.length + 1, options: [] })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type: fieldType, checked } = e.target
        setForm(prev => ({
        ...prev,
        [name]: fieldType === 'checkbox' ? checked : (name === 'order' ? parseInt(value, 10) || 1 : value),
        }))
    }

    const handleTypeChange = (newType: Question['type']) => {
        setForm(prev => ({
        ...prev,
        type: newType,
        options: newType === 'multiple-choice' ? prev.options : [],
        }))
    }

    const handleOptionChange = (idx: number, text: string) => {
        setForm(prev => {
        const opts = prev.options?.slice() ?? []
        opts[idx] = text
        return { ...prev, options: opts }
        })
    }

    const addOption = () => {
        setForm(prev => ({
        ...prev,
        options: [...(prev.options ?? []), ''],
        }))
    }

    const removeOption = (idx: number) => {
        setForm(prev => ({
        ...prev,
        options: prev.options?.filter((_, i) => i !== idx),
        }))
    }

    const handleSubmit = async () => {
        if (!form.label.trim()) return toast.error('Label is required')
        if (form.type === 'multiple-choice' && (!form.options || form.options.length < 2)) return toast.error('At least two options required')

        let updated: Question[]
        if (editingIndex !== null) {
          updated = questions.map((q, i) => (i === editingIndex ? { ...form } : q))
        } else {
          updated = [...questions, form]
        }

        // re-sort by order
        updated = updated
        .map((q, idx) => ({ ...q, order: q.order || idx + 1 }))
        .sort((a, b) => a.order - b.order)

        if(!update){
          const response = await addQuestion(updated,businessId!)
          if(response.status === 200){
            toast.success("New question added successfully")
            onUpdateAdded(updated)
          }
        }
        if(update){
          const response = await updateQuestion(updated,businessId!)
          if(response.status === 200){
            toast.success('Data updated successfully!')
            onUpdateAdded(updated)
          }
        }
    }

    const initializeForm = () => {
      if (question) {
        setForm({
          label: question.label,
          type: question.type,
          required: question.required,
          order: question.order,
          options: question.options,
        })
      } else {
        resetForm()
      }
    }
    
    useEffect(() => {
      if (open) {
        setQuestions([...initialQuestions].sort((a, b) => a.order - b.order))
        initializeForm()
      }
    }, [open, initialQuestions, question])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {
          !update && <Plus className='w-8 h-8'/>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configure Feedback Questions</DialogTitle>
          <DialogDescription>
            Add, edit or remove the questions your customers will see.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-64 overflow-auto mb-6">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-white dark:bg-muted/60 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {q.label} {q.required && <span className="text-red-500">*</span>}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {q.type} — Order: {q.order}
                </div>
              </div>
            </div>
          ))}
          {questions.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">No questions yet.</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="label">Question Text</Label>
            <Input
              id="label"
              name="label"
              value={form.label}
              onChange={handleChange}
              placeholder="Enter question"
            />
          </div>

          <div className="grid gap-2">
            <Label>Type</Label>
            <Select onValueChange={handleTypeChange} value={form.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="required">Required?</Label>
            <Input
              id="required"
              name="required"
              type="checkbox"
              checked={form.required}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={form.order}
              onChange={handleChange}
              min={1}
            />
          </div>

          {form.type === 'multiple-choice' && (
            <div className="space-y-2 h-[100px] overflow-auto">
              <Label>Options</Label>
              {form.options?.map((opt, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={e => handleOptionChange(i, e.target.value)}
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeOption(i)}
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button size="sm" onClick={addOption}>
                + Add Option
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            {editingIndex !== null ? 'Save Changes' : 'Add Question'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

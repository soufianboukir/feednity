"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Business } from "@/types"
import { deleteQuestion } from "@/services/questions"

interface DeleteBusinessProps {
  business?: Business
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (index: number) => void
  index?: number
}

export function DeleteQuestion({ business, open, onOpenChange, onDeleted, index }: DeleteBusinessProps) {
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsDeleting(true)
        try {
            const response = await deleteQuestion(business?._id,index)
            if (response.status === 200) {
              toast.success("Business deleted successfully!")
              onDeleted?.(index!)
              onOpenChange(false)
            } else {
              throw new Error("Delete failed")
            }
        } catch {
            toast.error("Failed to delete question. Please try again.")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

        <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleDelete}>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this question?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. The question will be permanently removed from the system.
                    </DialogDescription>
                </DialogHeader>
                <br />
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline" disabled={isDeleting}>
                        Cancel
                    </Button>
                    </DialogClose>
                    <Button type="submit" className="cursor-pointer" variant="destructive" disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}

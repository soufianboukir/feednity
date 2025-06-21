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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Business } from "@/types"
import { deleteBusiness } from "@/services/business"

interface DeleteBusinessProps {
  business?: Business
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (_id: string) => void
  children?: React.ReactNode
}

export function DeleteBusiness({ business, open, onOpenChange, onDeleted, children }: DeleteBusinessProps) {
    const [confirmName, setConfirmName] = React.useState("")
    const [isDeleting, setIsDeleting] = React.useState(false)

    React.useEffect(() => {
        if (!open) {
        setConfirmName("")
        }
    }, [open])

    const isMatch = confirmName === business?.name

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isMatch) return

        setIsDeleting(true)
        try {
            const response = await deleteBusiness(business._id!)
            if (response.status === 200) {
              toast.success("Business deleted successfully!")
              onDeleted?.(business._id!)
              onOpenChange(false)
            } else {
              throw new Error("Delete failed")
            }
        } catch (error) {
            toast.error("Failed to delete business. Please try again.")
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        {children && <DialogTrigger asChild>{children}</DialogTrigger>}

        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleDelete}>
            <DialogHeader>
                <DialogTitle>Delete Business</DialogTitle>
                <DialogDescription>
                    To delete <strong>{business?.name}</strong>, please type the business name below to confirm.
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <Label htmlFor="confirmName">Business Name</Label>
                <Input
                id="confirmName"
                value={confirmName}
                onChange={e => setConfirmName(e.target.value)}
                placeholder="Type business name to confirm"
                required
                autoFocus
                />
            </div>

            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline" disabled={isDeleting}>
                    Cancel
                </Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer" variant="destructive" disabled={!isMatch || isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}

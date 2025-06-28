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

export function FeedbackDialog({ feedback }: { feedback: Feedback }) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <span className="inline-flex items-center justify-center text-blue-600 hover:text-blue-700 hover:underline p-0 text-sm font-medium cursor-pointer transition-colors duration-150 ease-in-out">
            View Details
            </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40%] w-[90%] max-w-[95%] rounded-lg">
            <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Feedback Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                Submitted on {format(new Date(feedback.createdAt), "MMMM d, yyyy 'at' h:mm a")}
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

            {feedback.responses && (
                feedback.responses.map((response,index) => (
                    <div className="grid grid-cols-4 gap-4" key={index}>
                        <span className="col-span-1 font-semibold text-gray-700 dark:text-gray-300">{response.label}</span>
                        <p className="col-span-3 text-gray-700 dark:text-gray-300 p-3 rounded-md break-words">
                            {
                                Array.isArray(response.response) ? 
                                    response.response.map((res) => (
                                        {res} + ","
                                    ))
                                : response.response
                            }
                        </p>
                    </div>
                ))
            )}
            </div>

            <DialogFooter>
            <DialogClose asChild>
                <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                Close
                </Button>
            </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import Loading from '@/components/loading'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Question } from '@/interface'
import { Button } from '@/components/ui/button'
import { Clipboard, SquarePen, Trash2, TriangleAlert } from 'lucide-react'
import { QuestionsForm } from '@/components/questions-form'
import { useActiveBusiness } from '@/stores/business-store'
import { getQuestions } from '@/services/questions'
import { toast } from 'sonner'
import { DeleteQuestion } from '@/components/delete-question'

  

export default function Questions() {
    const { activeBusiness } = useActiveBusiness()
    const router = useRouter()
    const { data: session,status } = useSession();
    const [openAdd,setOpenAdd] = useState<boolean>(false)
    const [openDelete,setOpenDelete] = useState<boolean>(false)
    const [openUpdate,setOpenUpdate] = useState<boolean>(false)
    const [questionToUpdate,setQuestionToUpdate] = useState<Question>()
    const [indexToDelete,setIndexToDelete] = useState<number>();
    const [questions,setQuestions] = useState<Question[] | []>([])
    const [loading,setLoading] = useState(false)
    
    const businessId = activeBusiness?._id;

    
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true)
                const response = await getQuestions(businessId!)
                if (response.status === 200) {
                    setQuestions(response.data.questions)
                }
            } catch {
                toast.error('Failed to fetch questions')
            } finally {
                setLoading(false)
            }
        }
    
        if (activeBusiness && businessId) {
            fetchQuestions()
        }
    }, [activeBusiness, businessId])
    

    const onDeleted = (questionIdx: number) =>{
        const newQuestions = questions.filter((question,index) => index !== questionIdx);
        setQuestions(newQuestions);
    }

    const on_Update_Added= (newQuestions: Question[]) =>{
        setQuestions(newQuestions);
    }

    if(status === 'loading' || loading) return <Loading message='Loading your Questions...'/>
    if(session?.user.plan === 'free') return router.push('/upgrade-to-pro')

  return (
    <div>
        <SiteHeader pageName='Customize Feedback Questions'/>
        <div className="p-6 space-y-6 mx-auto">
            <h1 className="text-2xl font-semibold">Define the questions your customers will response when they visit your feedback form link.</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questions
                    .sort((a, b) => a.order - b.order)
                    .map((q, index) => (
                    <div
                        key={index}
                        className="border h-[200px] border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-muted/40 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 relative group overflow-auto"
                    >
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700"></div>
                        
                        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all shadow-xs hover:shadow-sm flex items-center gap-1"
                            aria-label={`Update question`}
                            onClick={() => {
                                setQuestionToUpdate(q)
                                setOpenUpdate(true)
                            }}
                            >
                            <SquarePen className='w-4 h-4' />
                            </Button>
                            <Button
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm px-3 py-1 rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all shadow-xs hover:shadow-sm flex items-center gap-1"
                                aria-label={`Delete question ${q.label}`}
                                onClick={() => {setOpenDelete(true); setIndexToDelete(index)}}
                            >
                                <Trash2 className='w-4 h-4'/>
                            </Button>
                        </div>

                        <div className="pr-10 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-lg font-semibold dark:text-white mb-1 flex gap-2 items-center">
                                    <span className="bg-gray-100 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {q.order}
                                    </span>
                                    {q.label}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2.5 py-1 rounded-full capitalize font-medium flex items-center gap-1">
                                        <Clipboard className="w-4 h-4"/>
                                        {q.type}
                                    </span>
                                        {q.required && (
                                        <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                                            <TriangleAlert className='w-4 h-4'/>
                                            Required
                                        </span>
                                        )}
                                </div>
                            </div>
                        </div>

                        {q.type === "multiple-choice" && q.options && (
                            <div className="mt-4 pl-2 flex-grow">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Options:
                                </p>
                                <ul className="space-y-2">
                                    {q.options.slice(0, 3).map((opt, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="flex-shrink-0 w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                        <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                                        </span>
                                        <span className="truncate">{opt}</span>
                                    </li>
                                    ))}
                                    {q.options.length > 3 && (
                                    <li className="text-xs text-gray-500 dark:text-gray-400">
                                        +{q.options.length - 3} more options
                                    </li>
                                    )}
                                </ul>
                            </div>
                        )}
                        </div>
                    </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 bg-white/50 dark:bg-muted/40 h-[200px] hover:bg-white transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer">
                    <div className="text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-3 transition-colors">
                            <QuestionsForm open={openAdd} onOpenChange={setOpenAdd} questions={questions} businessId={activeBusiness?._id} onUpdateAdded={on_Update_Added} update={false}/>
                        </div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Add New Question</p>
                    </div>
                </div>
            </div>
        </div>
        {
            openDelete && <DeleteQuestion business={activeBusiness} open={openDelete} onOpenChange={setOpenDelete} index={indexToDelete} onDeleted={onDeleted}/>
        }
        <QuestionsForm
            open={openUpdate}
            question={questionToUpdate}
            onOpenChange={(open) => {
                setOpenUpdate(open)
                if (!open) setQuestionToUpdate(undefined)
            }}
            questions={questions}
            businessId={activeBusiness?._id}
            onUpdateAdded={on_Update_Added}
            update={true}
            />
    </div>
  )
}

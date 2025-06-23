'use client'

import { EmptyState } from "@/components/empty-state"
import UnifiedFeedback from "@/components/feedback-1"
import Loading from "@/components/loading"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useLoading } from "@/contexts/global-loading"
import { updateBusinessForm } from "@/services/business"
import { useActiveBusiness } from "@/stores/business-store"
import { useEffect, useState } from "react"
import { toast } from "sonner"


export default function Page() {
  const { activeBusiness } = useActiveBusiness()
  const [activeForm, setActiveForm] = useState<'select' | 'stars' | 'emojis' | undefined>(
    activeBusiness?.activeForm
  );
  const [isLoading,setIsLoading] = useState(false);
  const {loading} = useLoading()

  const handleSave = async () =>{
    try{
      setIsLoading(true)
      const response = await updateBusinessForm(activeBusiness?._id,activeForm);
      if(response.status === 200){
        toast.success('Saved successfully')
        window.location.reload()
      }
    }catch(err: unknown){ 
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        toast.error(axiosError.response?.data?.error || "Network error. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    setActiveForm(activeBusiness?.activeForm)
  },[activeBusiness])

  if(loading) return <Loading />

  if (!activeBusiness) {
    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <SidebarInset>
          <SiteHeader pageName="Feedback Layout Options"/>
          <EmptyState />
        </SidebarInset>
      </SidebarProvider>
    )
  }
  return (
    <div>
        <SiteHeader pageName="Feedback Layout Options"/>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <UnifiedFeedback variant="select" businessName={activeBusiness.name} businessLogo={activeBusiness.logo} selectedForm={activeForm} setSelectedForm={setActiveForm} submit={false}/>
          <UnifiedFeedback variant="stars" businessName={activeBusiness.name} businessLogo={activeBusiness.logo} selectedForm={activeForm} setSelectedForm={setActiveForm} submit={false}/>
          <UnifiedFeedback variant="emojis" businessName={activeBusiness.name} businessLogo={activeBusiness.logo} selectedForm={activeForm} setSelectedForm={setActiveForm} submit={false}/>
        </div>
        <div className="flex justify-center mt-10">
          <Button className={`bg-green-600 cursor-pointer hover:bg-green-700 px-10 ${loading && 'bg-green-400'}`} onClick={handleSave}>
            {
              isLoading ? "...Loading" : "Save changes"
            }
          </Button>
        </div>
    </div>
  )
}


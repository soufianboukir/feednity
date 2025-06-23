'use client'

import { EmptyState } from "@/components/empty-state"
import UnifiedFeedback from "@/components/feedback-1"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { updateBusinessForm } from "@/services/business"
import { useActiveBusiness, useGlobalLoading } from "@/stores/business-store"
import { useState } from "react"
import { toast } from "sonner"


export default function Page() {
  const { activeBusiness } = useActiveBusiness()
  const [activeForm,setActiveForm] = useState(activeBusiness?.activeForm)
  const [loading,setLoading] = useState(false);
  const {loadingG,setLoadingG} = useGlobalLoading()

  console.log(activeBusiness);
  
  const handleSave = async () =>{
    try{
      setLoading(true)
      const response = await updateBusinessForm(activeBusiness?._id,activeForm);
      if(response.status === 200){
        toast.success('Saved successfully')
      }
    }catch(err: unknown){ 
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        toast.error(axiosError.response?.data?.error || "Network error. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }finally{
      setLoading(false)
    }
  }

  if(loadingG) return null

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
              loading ? "...Loading" : "Save changes"
            }
          </Button>
        </div>
    </div>
  )
}


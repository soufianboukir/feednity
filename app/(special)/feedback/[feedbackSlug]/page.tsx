'use client'

import UnifiedFeedback from "@/components/feedback-1";
import Loading from "@/components/loading";
import { getBusinessesData } from "@/services/business";
import { Business } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";

type Props = {
    params: { feedbackSlug: string }
}
  
export default function Page({ params }: Props) {

    const [loading,setLoading] = useState(true);
    const [businessData,setBusinessData] = useState<Business>()
    const [success,setSuccess] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await getBusinessesData(params.feedbackSlug);
            
            if (response.status !== 200) {
              toast.error('Business not found');
              return router.push('/not-found');
            }
      
            setBusinessData(response.data.business);
            setSuccess(true)
            
          } catch  {
            toast.error('An error occurred. Try again.');
            router.push('/notFound');
          } finally {
            setLoading(false);
          }
        };
      
        getData();
      }, [params.feedbackSlug]);

    if(loading) return <Loading message="loading feedback form..."/>

    if(success) return <div>
          <UnifiedFeedback businessLogo={businessData?.logo} businessQuestions={businessData?.questions} businessName={businessData?.name} variant={businessData?.activeForm} submit={true} feedbackSlug={params.feedbackSlug}/>
      </div>
}

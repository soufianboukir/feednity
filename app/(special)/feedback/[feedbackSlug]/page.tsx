"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UnifiedFeedback from "@/components/feedback-1";
import Loading from "@/components/loading";
import { getBusinessesData } from "@/services/business";
import { Business } from "@/types";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [businessData, setBusinessData] = useState<Business>();
  const [success, setSuccess] = useState(false);
  const [slugValue,setSlugValue] = useState('')

  useEffect(() => {
    const getData = async () => {
      const slug = params?.feedbackSlug;
      if (!slug) return;
      if (Array.isArray(slug)) {
        toast.error("Invalid feedback URL");
        router.push("/not-found");
        return;
      }
      setSlugValue(slug)

  
      try {
        const response = await getBusinessesData(slug);
  
        if (response.status !== 200) {
          toast.error("Business not found");
          router.push("/not-found");
          return;
        }
  
        setBusinessData(response.data.business);
        setSuccess(true);
      } catch {
        toast.error("An error occurred. Try again.");
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };
  
    getData();
  }, [params?.feedbackSlug, router]);

  if (loading) return <Loading message="loading feedback form..." />;

  if (success)
    return (
      <UnifiedFeedback
        businessLogo={businessData?.logo}
        businessQuestions={businessData?.questions}
        businessName={businessData?.name}
        variant={businessData?.activeForm}
        submit={true}
        feedbackSlug={slugValue || ""}
      />
    );

  return null;
}

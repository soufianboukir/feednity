'use client'

import { EmptyState } from "@/components/empty-state"
import { SiteHeader } from "@/components/site-header"
import { useActiveBusiness } from "@/stores/business-store"


export default function Page() {
  const { activeBusiness } = useActiveBusiness()
  
  return (
    <div>
        <SiteHeader pageName="Dashboard"/>
        {
          !activeBusiness && (
            <EmptyState />
          )
        }
        {
          activeBusiness && (
            `There is already a business named ${activeBusiness.name}`
          )
        }
        {/* <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div> */}
    </div>
  )
}


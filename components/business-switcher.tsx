"use client"

import * as React from "react"
import { ChevronsUpDown, GalleryVerticalEnd, Pencil, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { BusinessDialog } from "./business-form"
import { Business } from "@/types"
import { DeleteBusiness } from "./delete-business"

export function BusinessSwitcher({
  busis,
}: {
  busis: {
    name: string
    industry?: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [businesses, setBusinesses] = React.useState<Business[]>(busis)
  const [activeBusiness, setActiveBusiness] = React.useState<Business | undefined>(undefined)
  const [isBusiOpen, setIsBusiOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [busi,setBusi] = React.useState<Business>()

  
  React.useEffect(() => {
    if (!activeBusiness && businesses.length > 0) {
      setActiveBusiness(businesses[0])
    }
  }, [businesses, activeBusiness])

  const handleBusinessUpdated = (updated: Business) => {
    setBusinesses(prev =>
      prev.map(b => (b._id === updated._id ? updated : b))
    )
    if (activeBusiness?._id === updated._id) {
      setActiveBusiness(updated)
    }
  }

  const handleBusinessAdded = (added: Business) =>{
    const newBusiss = [...businesses,added]
    setBusinesses(newBusiss)
  }

  const handleBusinessDeleted = (_id: string) =>{
    const newBusiss = businesses.filter((busi) => busi._id !== _id)
    setBusinesses(newBusiss)
    if (activeBusiness?._id === _id) {
      setActiveBusiness(newBusiss[0])
    }
  }
  if (!businesses || businesses.length === 0) {
    return (
      <div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => setIsBusiOpen(true)}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image src="/feednity-logo.png" width={40} height={40} alt="app logo" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Create your first business</span>
                <span className="truncate text-xs">Business industry</span>
              </div>
              <Plus className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <BusinessDialog open={isBusiOpen} onOpenChange={setIsBusiOpen} onUpdate={handleBusinessAdded}/>
      </div>
    )
  }

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src="/feednity-logo.png" width={40} height={40} alt="app logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{activeBusiness?.name}</span>
                  <span className="truncate text-xs">{activeBusiness?.industry}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Businesses
              </DropdownMenuLabel>

              {businesses.map((busi) => (
                <div
                  key={busi.name}
                  className="gap-2 p-2 justify-between items-center flex"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-md border"
                    onClick={() => setActiveBusiness(busi)}>
                      <GalleryVerticalEnd className="size-4 text-gray-500" />
                    </div>
                    <span>{busi.name}</span>
                  </div>

                  <div className="flex gap-2 ml-auto">
                    <Pencil
                      className="size-4 text-muted-foreground hover:text-foreground cursor-pointer"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        setIsEditOpen(true)
                        setBusi(busi)
                      }}
                    />
                    <Trash2
                      className="size-4 cursor-pointer text-red-500 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsDeleteOpen(true)
                        setBusi(busi)
                      }}
                    />
                  </div>
                </div>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 p-2" onSelect={() => setIsBusiOpen(true)}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Add business</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <BusinessDialog open={isBusiOpen} onOpenChange={setIsBusiOpen} onUpdate={handleBusinessAdded}/>
      <BusinessDialog open={isEditOpen} onOpenChange={setIsEditOpen} business={busi} onUpdate={handleBusinessUpdated}/>
      <DeleteBusiness open={isDeleteOpen} onOpenChange={setIsDeleteOpen} business={busi} onDeleted={handleBusinessDeleted}/>
    </div>
  )
}

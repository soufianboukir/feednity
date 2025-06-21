"use client"

import * as React from "react"
import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { BusinessDialog } from "./business-form"

export function BusinessSwitcher({
  businesses,
}: {
  businesses: {
    name: string
    industry?: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeBusiness, setActiveBusiness] = React.useState(businesses.length > 0 ? businesses[0] : null)
  const [isBusiOpen, setIsBusiOpen] = React.useState(false)
  

  if (!businesses) {
    return null
  }  

  console.log(activeBusiness);
  

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
                  <Image src={'/feednity-logo.png'} width={40} height={40} alt="app logo"/>
                </div>
                {
                  (businesses.length === 0 || !businesses) && (
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Create your first buissiness</span>
                      <span className="truncate text-xs">Business industry</span>
                    </div>
                  )
                }
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{activeBusiness?.name}</span>
                  <span className="truncate text-xs">{activeBusiness?.industry}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Businesses
              </DropdownMenuLabel>
                {businesses.map((busi, index) => (
                <DropdownMenuItem
                  key={busi.name}
                  onClick={() => setActiveBusiness(busi)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <GalleryVerticalEnd />
                  </div>
                  {busi.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
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

      <BusinessDialog open={isBusiOpen}
      onOpenChange={setIsBusiOpen}
      />
    </div>
  )
}

"use client"

import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    name: string
    url: string
    icon?: LucideIcon
    proOnly?: boolean
    coming?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <Link href={item.url} className="flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </div>

                {item.proOnly && (
                  <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold">
                    PRO
                  </span>
                )}
                {item.coming && (
                  <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold">
                    Coming
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
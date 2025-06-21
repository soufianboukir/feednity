"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { BusinessSwitcher } from "./business-switcher"
import { getBusinesses } from "@/services/business"
import { toast } from "sonner"
import { Business } from "@/types"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

type User = {
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro';
  isVerified?: boolean;
};

function createUserFromSession(session: Session | null): User {
  if (!session?.user) {
    return {
      name: 'Guest User',
      email: 'guest@example.com',
      avatar: '/avatars/default.jpg',
      plan: 'free'
    };
  }

  return {
    name: session.user.name ?? 'Unknown User',
    email: session.user.email ?? 'no-email@example.com',
    avatar: session.user.image ?? '/avatars/default.jpg',
    plan: (session.user).plan ?? 'free',
    isVerified: (session.user).isVerified ?? false,
  };
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading,setLoading] = React.useState<boolean>(false)
  const [businesses,setBusinesses] = React.useState<Business[]>([])

  React.useEffect(() =>{
    try{
      setLoading(true)
      const getBuiss = async () =>{
        const response = await getBusinesses()
        console.log(response);
        
        if(response.status === 200){
          setBusinesses(response.data.businesses)
        }
      }
      getBuiss()
    }catch{
      toast.error('Failed to get businesses')
    }finally{
      setLoading(false)
    }
  },[])

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="animate-pulse bg-gray-200 h-8 rounded"></div>
        </SidebarHeader>
        <SidebarContent>
          <div className="animate-pulse space-y-2 p-4">
            <div className="bg-gray-200 h-6 rounded"></div>
            <div className="bg-gray-200 h-6 rounded"></div>
            <div className="bg-gray-200 h-6 rounded"></div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="animate-pulse bg-gray-200 h-8 rounded"></div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const user = createUserFromSession(session);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BusinessSwitcher businesses={businesses} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

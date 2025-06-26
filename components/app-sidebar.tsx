"use client"

import * as React from "react"
import {
  BarChart,
  Download,
  FileText,
  HelpCircle,
  LayoutDashboard,
  ListChecks,
  Mail,
  Megaphone,
  MessageSquare,
  QrCode,
  Repeat,
  Reply,
  Rocket,
  ShieldCheck,
  Sliders,
} from "lucide-react"

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
import { NavMain } from "./nav-main"
import { NavHelp } from "./nav-help"
import { useLoading } from "@/contexts/global-loading"

const data = {
  navMain: [
    {
      name: "Dashboard",
      url: "/panel",
      icon: LayoutDashboard,
    },
    {
      name: "Feedback",
      url: "/feedback",
      icon: MessageSquare,
    },
    {
      name: "Analytics",
      url: "/analytics",
      icon: BarChart,
      proOnly: true
    },
    {
      name: "Export",
      url: "/export",
      icon: Download,
      proOnly: true
    },
    {
      name: "Qrs",
      url: "/qr",
      icon: QrCode,
    },
    {
      name: "Customization",
      url: "/customize",
      icon: Sliders,
    },
    {
      name: "Automations",
      url: "/automations",
      icon: Repeat,
      proOnly: true
    },
    {
      name: "Questions",
      url: "/questions",
      icon: ListChecks,
      proOnly: true
    },
    {
      name: "Responses",
      url: "/responses",
      icon: Reply,
      proOnly: true
    },
  ],
  navHelp: [
    {
      name: "FAQs",
      url: "/faqs",
      icon: HelpCircle,
    },
    {
      name: "Getting started",
      url: "/start",
      icon: Rocket,
    },
    {
      name: "Contact support",
      url: "/contact",
      icon: Mail,
    },
    {
      name: "Feedback",
      url: "/feedback-for-platform",
      icon: Megaphone,
    },
    {
      name: "Privacy Policy",
      url: "/privacy-policy",
      icon: ShieldCheck,
    },
    {
      name: "Terms of service",
      url: "/terms-of-service",
      icon: FileText,
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
  const {loading, setLoading} = useLoading()
  const [businesses,setBusinesses] = React.useState<Business[]>([])

  
  React.useEffect(() => {
    let mounted = true;
    
    const getBusinessesData = async () => {
      try {
        setLoading(true);
        
        const response = await getBusinesses();
        
        if (mounted && response.status === 200) {
          setBusinesses(response.data.businesses);
        }
      } catch {
        toast.error('Failed to get businesses');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getBusinessesData();

    return () => {
      mounted = false;
    };
  }, [setLoading]);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="animate-pulse bg-gray-200 h-8 rounded dark:bg-gray-800"></div>
        </SidebarHeader>
        <SidebarContent>
          <div className="animate-pulse space-y-2 p-4">
            <div className="bg-gray-200 dark:bg-gray-800 h-6 rounded"></div>
            <div className="bg-gray-200 h-6 dark:bg-gray-800 rounded"></div>
            <div className="bg-gray-200 h-6 rounded dark:bg-gray-800"></div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="animate-pulse bg-gray-200 h-8 rounded dark:bg-gray-800"></div>
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
        <BusinessSwitcher busis={businesses} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavHelp items={data.navHelp} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import { HomeIcon, NewspaperIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton } from "./ui/sidebar";
import { usePathname } from "next/navigation";

const pages = [
    {
        name: 'Home',
        icon: HomeIcon,
        link: '/'
    },
    {
        name: 'Articles',
        icon: NewspaperIcon,
        link: '/articles'
    }
]

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader className="border-b">
                <span className="text-lg font-bold">Next Wave XR</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Pages</SidebarGroupLabel>
                    <SidebarMenu>
                        {pages.map((page, index) => {
                            const isPage = pathname === page.link;

                            return (
                                <SidebarMenuButton 
                                    key={index} 
                                    asChild
                                >
                                    <a href={page.link}>
                                        <page.icon />
                                        {page.name}
                                        {isPage && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-sidebar-primary"></div>
                                        )}
                                    </a>
                                </SidebarMenuButton>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
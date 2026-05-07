"use client"

import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LayoutDashboard, LogOut, Plus, UserRoundPlus, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AdminProviers({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useConvexAuth();

    if (!isAuthenticated) return children;

    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <header className="flex gap-4 p-5 border-b">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-4 my-auto" />
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

function AdminSidebar() {
    const pathname = usePathname();
    const articleId = pathname.split("/admin/edit/")[1];

    const articles = useQuery(api.articles.getArticles);

    const currentArticle = articles?.find(
        (article) => article._id === articleId
    );
    
    const user = useQuery(api.user.getUser);
    
    const { signOut } = useAuthActions();
    
    const isMobile = useIsMobile();
    

    if (!articles) return;
    
    const pages = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            href: "/admin/dashboard"
        },
        {
            icon: Plus,
            label: "Create",
            href: "/admin/create"
        },
        {
            icon: UserRoundPlus,
            label: "Add Account",
            href: "/admin/account"
        },
    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton size={'lg'}>
                                <div className="h-full aspect-square rounded-lg border uppercase flex items-center justify-center">
                                    {user?.email?.slice(0, 2)}
                                </div>
                                <span className="text-md">{user?.email}</span>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="start">
                            <DropdownMenuItem
                                variant="destructive" 
                                onClick={async () => await signOut()}
                                className="cursor-pointer"
                            >
                                <LogOut />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Pages</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {pages.map((page, index) => (
                                <SidebarMenuButton 
                                    asChild 
                                    tooltip={pathname == page.href ? `${page.label} • Current` : page.label}
                                    key={index}
                                >
                                    <a href={page.href} key={index}>
                                        <page.icon />
                                        {page.label}
                                        {pathname == page.href && (
                                            <div className="ms-auto w-2 h-2 rounded-full bg-sidebar-primary"></div>
                                        )}
                                    </a>
                                </SidebarMenuButton>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {currentArticle && (
                    <SidebarGroup>
                        <SidebarGroupContent className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Editing Article</span>

                                <span className="text-xs text-muted-foreground line-clamp-2 max-w-[180px]">
                                    {currentArticle?.title}
                                </span>
                            </div>
                            {pathname.startsWith("/admin/edit") && (
                                <div className="ms-auto w-2 h-2 rounded-full bg-sidebar-primary shrink-0" />
                            )}
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}       
            </SidebarContent>
        </Sidebar>
    )
}
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "next-themes";
import { SidebarInput, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";
import Footer from "./footer";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
        <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem
        >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="h-16 flex items-center px-5 border-b backdrop-blur-md">
                        <SidebarTrigger />
                    </header>
                    <main>
                        {children}
                        <Footer />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    </ConvexProvider>
  );
}
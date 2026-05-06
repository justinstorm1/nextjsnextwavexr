"use client"

import AdminProviders from "@/components/AdminProviders";
import { Authenticated, Unauthenticated } from "convex/react";
import { UnauthenticatedScreen } from "./create/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <AdminProviders>
            <Unauthenticated>
                <UnauthenticatedScreen />
            </Unauthenticated>
            <Authenticated>
                {children}
            </Authenticated>
        </AdminProviders>
    )
}
"use client"

import { useConvexAuth } from "convex/react"
import { useEffect } from "react";
import { UnauthenticatedScreen } from "./create/page";

export default function Page() {

    const { isAuthenticated } = useConvexAuth();

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/admin/dashboard'
        }
    }, [isAuthenticated])
    
    return (
        <UnauthenticatedScreen />
    )
}
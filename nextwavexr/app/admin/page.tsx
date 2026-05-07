"use client"

import { useConvexAuth } from "convex/react"
import { useEffect, useLayoutEffect } from "react";
import { UnauthenticatedScreen } from "./create/page";

export default function Page() {

    const { isAuthenticated } = useConvexAuth();

    useLayoutEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/admin/dashboard'
        }
    }, [isAuthenticated])
    
    return (
        <UnauthenticatedScreen />
    )
}
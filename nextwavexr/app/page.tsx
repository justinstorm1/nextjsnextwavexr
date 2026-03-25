import { ComponentExample } from "@/components/component-example";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from 'next/image';
import NextWaveXRLogo from '@/public/img/logo.png';
import { Button } from "@/components/ui/button";
import { NewspaperIcon } from "lucide-react";

export default function Page() {
    return (
        <main>
            <div 
                className="h-[calc(100vh-64px)] w-full items-center justify-center flex bg-black/40"
                style={{
                    backgroundImage: `url(${NextWaveXRLogo.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="space-y-2">
                    <h1 className="font-bold text-5xl text-shadow text-shadow-lg">
                        Welcome to<br />
                        <span className="text-primary italic">Next Wave XR</span>
                        !
                    </h1>
                    <Button className="backdrop-blur-md" variant={'outline'} asChild>
                        <a href="/articles">
                            <NewspaperIcon />
                            Explore Articles
                        </a>
                    </Button>
                </div>
            </div>
        </main>
    )
}
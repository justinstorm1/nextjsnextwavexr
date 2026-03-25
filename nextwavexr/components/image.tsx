import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function ImageComponent({ storageId, alt, className, caption }: { storageId: Id<"_storage">, alt?: string, className?: string, caption?: string }) {
    const headerImage = useQuery(api.articles.getImage,  { storageId });
    if (!headerImage) return null;

    return (
        <div className="flex flex-col items-center gap-1">
            <img 
                src={headerImage}
                alt={alt}
                className={className}
            />
            <span className="text-xs text-center text-muted-foreground">{caption}</span>
        </div>
    )
}
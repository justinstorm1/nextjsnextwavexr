"use client"

import ImageComponent from "@/components/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { use } from "react";

export default function page({ params }: { params: Promise<{ articleId: string }> }) {
    const { articleId } = use(params);

    const article = useQuery(api.articles.getArticle, { articleId: articleId as Id<"articles"> });

    const author = useQuery(api.articles.getAuthor, article ? { authorId: article?.author } : "skip");

    if (!article) return <div className="h-40 w-full bg-muted animate-pulse" />;

    const dateString = new Date(article.datePublished).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const todayString = new Date().toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const publishedToday = dateString === todayString;

    return (
        <main className="p-10 flex justify-center">
            <div className="max-w-3xl w-full">
                {article.headerImage?.storageId && (
                    <ImageComponent 
                        storageId={article.headerImage?.storageId}
                        alt="Header"
                        className="rounded-2xl w-full"
                        caption={article.headerImage.caption}
                    />
                )}
                <div className="py-5 space-y-1">
                    <h1 className="text-3xl font-bold">{article?.title}</h1>
                    <div className="flex justify-between">
                        <p>{dateString}</p>
                        {publishedToday && (
                            <Badge>New</Badge>
                        )}
                    </div>
                    <Button className="p-0 text-foreground" variant={'link'} asChild>
                        <a href="/">{author?.name}</a>
                    </Button>
                </div>
                <Separator />
                <div className="space-y-10 py-5">
                    {article.content.split(/\n{2,}/).map((line, index) => {
                        if (line === "<Separator />") {
                            return <Separator />
                        } else {
                            return (
                                <div className="space-y-10">
                                    {article.images.filter(image => image.placement === index + 1).map((image, index) => (
                                        <ImageComponent 
                                            storageId={article.images[index].storageId}
                                            caption={article.images[index].caption}
                                        />
                                    ))}
                                    <div dangerouslySetInnerHTML={{ __html: line }} key={index} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </main>
    )
}
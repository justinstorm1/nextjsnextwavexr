"use client"

import { Id } from "@/convex/_generated/dataModel";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Badge } from "./ui/badge";
import ImageComponent from "./image";
import Link from "next/link";

export default function ArticleLink({ articleId }: { articleId: Id<"articles"> }) {
    const article = useQuery(api.articles.getArticle, { articleId });

    const author = useQuery(api.articles.getAuthor, article ? { authorId: article.author } : "skip");

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
        <Link href={`/articles/${article._id}`}>
            <Card className="pt-0">
                {article.headerImage?.storageId && (
                    <ImageComponent 
                        storageId={article.headerImage?.storageId}
                        className="w-full"
                        alt="Header"
                    />
                )}
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="text-2xl font-bold">{article?.title}</CardTitle>
                        {publishedToday && (
                            <Badge variant={'default'}>New</Badge>
                        )}
                    </div>
                    <CardDescription>{dateString}</CardDescription>
                    <CardDescription>{author?.name}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}
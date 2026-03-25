"use client"

import ArticleLink from "@/components/ArticleLink";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Newspaper, NewspaperIcon } from "lucide-react";

export default function page() {
    const articles = useQuery(api.articles.getArticles);

    if (articles === undefined) {
        return (
            <main className="w-full h-[calc(100vh-64px)] flex flex-col gap-2 items-center justify-center">
                <NewspaperIcon className="size-15" />
                <p>No articles</p>
            </main>
        )
    }
    
    return (
        <main className="p-5 flex justify-center">
            <div className="grid grid-cols-1 max-w-3xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {articles?.map((article) => (
                    // <p>{article.title}</p>
                    <ArticleLink 
                        key={article._id} 
                        articleId={article._id} 
                    />
                ))}
            </div>
        </main>
    )
}
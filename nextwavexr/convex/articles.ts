import { convexToJson, v } from 'convex/values';
import { query } from './_generated/server';

export const getArticles = query({
    handler: async (ctx) => {
        const articles = await ctx.db
            .query("articles")
            .order("desc")
            .collect();
        if (!articles) return;
        return articles;
    }
});

export const getArticle = query({
    args: { articleId: v.id("articles") },
    handler: async (ctx, { articleId }) => {
        const article = await ctx.db.get(articleId);
        if (!article) return;
        return article;
    }
})

export const getAuthor = query({
    args: { authorId: v.id("authors") },
    handler: async (ctx, { authorId }) => {
        const author = await ctx.db.get(authorId);
        if (!author) return;
        return author;
    }
});

export const getAuthors = query({
    handler: async (ctx) => {
        const authors = await ctx.db
            .query("authors")
            .order("desc")
            .collect();
        if (!authors) return;
        return authors;
    }
});

export const getImage = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, { storageId }) => {
        const imageUrl = await ctx.storage.getUrl(storageId);
        if (!imageUrl) return;
        return imageUrl;
    }
})
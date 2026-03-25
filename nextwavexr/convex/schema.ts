import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    authors: defineTable({
        name: v.string(),
        bio: v.optional(v.string()),
    }),
    articles: defineTable({
        published: v.boolean(),
        headerImage: v.optional(v.object({
            storageId: v.id("_storage"),
            caption: v.optional(v.string())
        })),
        title: v.string(),
        datePublished: v.number(),
        author: v.id("authors"),
        content: v.string(), 
        category: v.union(
            v.literal('Fitness & Wellness'),
            v.literal("Virtual Shift"),
            v.literal("Immersive Onside"),
            v.literal("XR News & Analysis"),
            v.literal("Misc"),
        ),
        articleLink: v.optional(v.string()),
        videos: v.array(
            v.object({
                storageId: v.id("_storage"),
                placement: v.number(),
                caption: v.string(),
            })
        ),
        images: v.array(
            v.object({
                storageId: v.id("_storage"),
                placement: v.number(),
                caption: v.optional(v.string()),
            })
        )
    })
})
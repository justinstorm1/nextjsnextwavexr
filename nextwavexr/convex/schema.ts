import { authTables } from '@convex-dev/auth/server'
import { defineTable, defineSchema } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    ...authTables,
    articles: defineTable({
        headerImage: v.string(),
        title: v.string(),
        author: v.string(),
        link: v.string(),
        published: v.boolean(),
        date: v.number(),
        category: v.string()
    })
})
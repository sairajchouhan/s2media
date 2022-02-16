import { Client } from '@notionhq/client'

// Initializing a client
export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET,
})
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string

import { Client } from '@notionhq/client'

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_SECRET,
})
export const databaseId = process.env.NOTION_DATABASE_ID as string

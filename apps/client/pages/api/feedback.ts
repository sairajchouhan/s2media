import { databaseId, notion } from '../../config/notion'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { feedback } = req.body

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: feedback,
              },
            },
          ],
        },
      },
    })
    res.json({
      success: true,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

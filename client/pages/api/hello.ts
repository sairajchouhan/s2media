// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ database: process.env.DATABASE_URL })
}

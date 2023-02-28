// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// https://www.npmjs.com/package/next-sanity#next-sanitypreview-live-real-time-preview
export default function preview(req: NextApiRequest, res: NextApiResponse) {
  res.setPreviewData({})
  res.writeHead(307, {Location: '/'})
  res.end()
}

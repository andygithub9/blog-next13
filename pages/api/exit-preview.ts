import type { NextApiRequest, NextApiResponse } from "next";

// https://www.npmjs.com/package/next-sanity#next-sanitypreview-live-real-time-preview

export default function exit(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.writeHead(307, { Location: "/" });
  res.end();
}

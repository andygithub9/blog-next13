// https://www.npmjs.com/package/next-sanity#next-sanitypreview-live-real-time-preview
"use client";

import { definePreview } from "next-sanity/preview";
import { projectId, dataset } from "./sanity.client";

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`);
}

// 類型保護, 確保 projectId 和 dataset 不是 undefined
// 如果這邊沒有做類型保護會出現 definePreview 裡的 projectId 和 dataset 參數會出現下面的錯誤
// Type 'string | undefined' is not assignable to type 'string'.
if (!projectId || !dataset) {
  throw new Error(
    `Missing projectId or dataset. Check your sanity.json or .env`
  );
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
});

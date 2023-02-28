// https://www.npmjs.com/package/next-sanity#next-sanitypreview-live-real-time-preview
import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
// 移除 PreviewSuspense 因為會報錯 Uncaught TypeError: wakeable.then is not a function
import PreviewSuspense from "../../components/PreviewSuspense";
import PreviewBlogList from "../../components/PreviewBlogList";
import BlogList from "../../components/BlogList";

// 可以把這段 query 拿去 sanity studio 跑看看是否正確 http://localhost:3000/studio/vision
// const query = groq`
// *[_type=='post'] { // *代表所有, 拿到所有 type 是 post 的資料
//   ..., // ...代表我要所有的欄位
//   author->, // ->表示把這個欄位關聯到的 table join 近來
//   categories[]-> // 一個 post 會對應到多個 categories 所以要加上 [], 並把關聯到的 categories 都 join 近來
// } | order(_createAt desc) // 通過管道符 | 將拿到的資料用 order(_createAt desc) 依據 _createAt 這個欄位做降序排列
// `;

const query = groq`
*[_type=='post'] { 
  ..., 
  author->, 
  categories[]-> 
} | order(_createAt desc)
`;

// 記得要在最外層 export const revalidate 才會是 ISR，api 資料更新時會根據 revalidate 的時間抓取最新的資料
// 否則會是 SSG，只在 build 的時候會抓取 api，資料永遠是在 build 的時候的資料不會被更新
export const revalidate = 60; // revalidate this page every 60 seconds

export default async function HomePage() {
  if (previewData()) {
    return (
      // 移除 PreviewSuspense 因為會報錯 Uncaught TypeError: wakeable.then is not a function
      // <PreviewSuspense fallback="Loading...">
      <PreviewBlogList query={query} />
      // </PreviewSuspense>
    );
  }

  // 記得要在最外層 export const revalidate 才會是 ISR，api 資料更新時會根據 revalidate 的時間抓取最新的資料
  // 否則會是 SSG，只在 build 的時候會抓取 api，資料永遠是在 build 的時候的資料不會被更新
  const posts = await client.fetch(query);
  return (
    // BlogList
    <BlogList posts={posts} />
  );
}

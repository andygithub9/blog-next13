# Init Sanity

1. 初始化 Sanity 專案

   ```sh
   機器名稱 目前所在目錄 % npm create sanity@latest -- --coupon sonny2022
   Ok to proceed? (y)

   ? Project name: nextjs13 sanity blog

   The default dataset configuration has a public dataset named "production".

   ? Use the default dataset configuration? Yes

   ✔ Creating dataset
   ? Project output path: (hit enter)
   ? Select project template Blog (schema)
   ? Do you want to use TypeScript? Yes
   ? Package manager to use for installing dependencies? yarn
   ```

2. 安裝依賴 https://www.npmjs.com/package/next-sanity#installation
   `yarn add next-sanity @portabletext/react @sanity/image-url`

3. 把 Sanity 和 Next.js 合併在一起, 這樣就不會在 Next.js 專案下又有一個 Sanity 專案, https://www.youtube.com/watch?v=x3fCEPFgUSM 21:34 ~ 30:00

4. Setup Next 13 app/studio https://www.npmjs.com/package/next-sanity#next-13-appstudio

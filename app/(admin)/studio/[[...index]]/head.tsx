// Cannot redeclare exported variable 'default'.
// Export declaration conflicts with exported declaration of 'CustomStudioHead'. 
// 不能重複宣告 default 變數, export 'NextStudioHead as default' 和 export 'CustomStudioHead' 衝突, 所以我們這裡要把 ' as default' 拿掉

// Re-export `NextStudioHead` as default if you're happy with the default behavior
// export {NextStudioHead as default} from 'next-sanity/studio/head'

// 改成下面這行
export {NextStudioHead} from 'next-sanity/studio/head'

// To customize it, use it as a children component:
import {NextStudioHead} from 'next-sanity/studio/head'

export default function CustomStudioHead() {
  return (
    <>
      <NextStudioHead favicons={false} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://www.sanity.io/static/images/favicons/favicon-32x32.png"
      />
    </>
  )
}
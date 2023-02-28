import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";
import { RichTextComponents } from "../../../../components/RichTextComponents";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60; // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const query = groq`*[_type=='post']{
    slug
  }`;

  const slug: Post[] = await client.fetch(query);
  const slugRoutes = slug.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({ slug }));
}

async function Post({ params: { slug } }: Props) {
  // 調用 sanity.client.fetch 時把 groq query 傳到第一個參數, 第二個參數則是一個 object , object 裡面的 key 對應 groq query 宣告的 '$變數', 並把 object 裡面的 key 對應到的值傳進 '$變數' 中
  const query = groq`
  *[_type=='post' && slug.current == $slug][0] 
  {
    ...,
    author->,
    categories[]->
  }
  `;

  // client.fetch 的第二個 object 參數中的 key 也就是 slug 對應的值會傳入到上面的 groq query 的 $slug 中
  // key 和 value 都叫 slug 所以 { slug: slug } 可以簡寫成 { slug }
  const post: Post = await client.fetch(query, { slug });

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white">
        <div className="relative flex flex-col justify-between md:flex-row">
          {/* 
            使用 absolute 定位的元素會相對於最近的已定位祖先元素 (即 position 不為 static 的祖先元素) 移動。如果沒有已定位祖先元素，則會相對於最上層的 <html> 元素移動。
            如果要獲取更精確的定位，可以將已定位祖先元素的 position 設置為 relative，然後將目標元素的 position 設置為 absolute。這樣就可以通過設置 top、right、bottom、left 來控制目標元素的位置。
          */}
          {/* position 的優先級是 absolute = fixed > relative > static */}
          {/* 所以下一個同層級的標籤 position: static(預設值) 會疊在 position: absolute 下方 */}
          <div className="absolute top-0 h-full w-full p-10 opacity-10 blur-sm">
            <Image
              className="mx-auto object-cover object-center"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          {/* position 的優先級是 absolute = fixed > relative > static */}
          {/* 標籤 position 的預設值是 static , static 優先級 absolute 低, 所以這個標籤會疊在上面同層級的 position: absolute 標籤的下方 */}
          <section className="w-full bg-[#F7AB0A] p-5">
            <div className="flex flex-col justify-between gap-y-5 md:flex-row">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />
                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div>{/* Author BIO */}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="pt-10 italic">{post.description}</h2>
              <div className="mt-auto flex items-center justify-end space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className="mt-4 rounded-full bg-gray-800 px-3 py-1 text-sm font-semibold text-white"
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
}

export default Post;

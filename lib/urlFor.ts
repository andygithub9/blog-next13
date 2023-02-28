// https://www.sanity.io/docs/image-url#usage
import { client } from "./sanity.client";
// 在 @sanity 庫中有內建 image-url 模塊
import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default urlFor
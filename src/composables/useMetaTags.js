import { useMeta } from "quasar";

export default function useMetaTags(metaData) {

  const image = metaData.image || '/assets/img/logo/logo.png';

  const defaultDescription = `Best Place To Buy & Sell 1timeused Items. On 1timeused app you are able to sell your old and new clothes, shoes, jewellery and any other accessories or equipments. And also you can rent your items by with just few clicks. The trade is peer to peer and no charges/fee is involved. Soon we are also launching donation option to help those who need.`;

  useMeta({
    title: `${metaData.title || 'Home'} - 1timeused`,
    // meta tags
    meta: {
      description: { name: "description", content: metaData.description || defaultDescription },
      keywords: { name: "keywords", content: metaData.keywords || '1timeused, rent out used items' },
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        property: "og:title",
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `${metaData.title || 'Home'} - 1timeused`;
        },
      },
      ogDescription: {
        property: "og:description",
        template(ogDescription) {
          return metaData.description || defaultDescription;
        },
      },
      ogImage: {
        property: "og:image",
        template(ogImage) {
          return image.includes('http') ? image : process.env.imagesBaseURL + image;
        },
      },
    }
  });
}

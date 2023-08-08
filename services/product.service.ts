import { ShopifyService } from "./shopify.service";

export interface SingleProductProps {
  title: string;
  description: string;
  images: {
    id: string;
    src: string;
    alt: string;
  }[];
  variants: {
    id: string;
    title: string;
    image?: string;
    price: {
      amount: number;
    };
  }[];
}

export async function getProduct(handle: string): Promise<SingleProductProps> {
  const { productByHandle } = await ShopifyService.getProductSingle({
    handle,
  });
  const { title, description, seo, images, variants } = productByHandle!;
  const product: SingleProductProps = {
    title: title,
    description,
    images: images.edges.map(({ node }) => {
      return {
        id: node.id as string,
        src: node.transformedSrc,
        alt: node.altText || "",
      };
    }),
    variants: variants.edges.map(({ node }) => {
      const variant: SingleProductProps["variants"][0] = {
        id: node.id,
        title: node.title,
        image: node.image?.id!,
        price: {
          amount: Number(node.priceV2.amount),
        },
      };

      return variant;
    }),
  };

  return product;
}

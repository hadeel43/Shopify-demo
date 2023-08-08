import { ShopifyService } from "./shopify.service";

export namespace ProductService {
  export interface Single {
    title: string;
    description: string;
    seo: {
      title: string;
      description: string;
    };
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

  export async function getSingle(handle: string): Promise<Single> {
    const { productByHandle } = await ShopifyService.getProductSingle({
      handle,
    });
    const { title, description, seo, images, variants } = productByHandle!;
    const product: Single = {
      title: title,
      description,
      seo: {
        title: seo.title || title,
        description: seo.description || description,
      },
      images: images.edges.map(({ node }) => {
        return {
          id: node.id as string,
          src: node.transformedSrc,
          alt: node.altText || "",
        };
      }),
      variants: variants.edges.map(({ node }) => {
        const variant: Single["variants"][0] = {
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
}

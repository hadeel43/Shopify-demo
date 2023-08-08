import { gql } from "graphql-request";
import { client } from "./shopify.service";

export async function retrieveCart(cartId: string) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt
        lines(first: 2) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }

        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    const data = await client.request(cartQuery, variables);
    return data.cart;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addToCart(itemId: string) {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [
        {
          merchandiseId: itemId,
        },
      ],
    },
  };
  try {
    const data = await client.request(createCartMutation, variables);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getCheckoutUrl = async (cartId: string) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };

  try {
    return await client.request(getCheckoutUrlQuery, variables);
  } catch (error: any) {
    throw new Error(error);
  }
};

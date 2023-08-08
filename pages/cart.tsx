import { getCheckoutUrl, retrieveCart } from "../services/cart.service";
import Link from "next/link";

interface Props {
  cart: any;
  checkoutUrl: string;
}

export default function Cart({ cart, checkoutUrl }: Props) {
  return (
    <ul role="list-item">
      {cart.lines.edges.map((item: any) => {
        return (
          <li
            key={item.node.id}
            className="flex  h-screen bg-bgColor text-black w-full justify-between items-center"
          >
            <div className=" w-full justify-center items-center flex flex-col gap-4">
              <h2 className="text-2xl lg:text-4xl font-bold  uppercase">
                {item.node.merchandise.product.title}
              </h2>
              <p>
                price:{" "}
                {
                  item.node.merchandise.product.priceRange.minVariantPrice
                    .amount
                }
              </p>
              <p>Quantity: {item.node.quantity}</p>
              <h2>
                Total including vat : {cart.estimatedCost.totalAmount.amount}
              </h2>
              <Link
                href={checkoutUrl}
                className="font-normal rounded focus:outline-none text-sm relative  bg-primary flex items-center justify-between juhover:bg-blue-500 text-white text-left p-4"
              >
                Checkout
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export const getServerSideProps = async (context: any) => {
  const { cartid } = context.query;
  const cart = await retrieveCart(cartid);
  const data = await getCheckoutUrl(cartid);
  const { checkoutUrl } = data.cart;
  return {
    props: {
      cart,
      checkoutUrl,
    },
  };
};

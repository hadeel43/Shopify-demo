import NextImage from "../components/Image/Image";
import Button from "../components/Buttons/Button";
import { SingleProductProps, getProduct } from "../services/product.service";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useImmer } from "use-immer";
import { addToCart } from "../services/cart.service";
import Link from "next/link";

interface Props {
  product: SingleProductProps;
}
interface State {
  variant: SingleProductProps["variants"][0];
}

export default function Page({ product }: Props) {
  const [state, setState] = useImmer<State>({ variant: product.variants[0] });
  const [activeButton, setActiveButton] = useState(product.variants[0].id);
  const [cartId, setCardId] = useState(product.variants[0].id);

  const selectProduct = async (e: any) => {
    const variant = product.variants.find(({ id }) => id === e.target.value);
    setState((draft) => {
      draft.variant = variant!;
    });
    setActiveButton(e.target.value);
  };

  useEffect(() => {
    const addCart = async () => {
      if (cartId) {
        const data = await addToCart(state.variant.id);
        setCardId(data.cartCreate.cart.id);
      }
    };

    addCart();
  }, [state]); // Only re-subscribe if state changed

  const image = product.images.filter(
    (image) => image.id === state.variant?.image
  );

  return (
    <div className="flex flex-col lg:flex-row  h-screen bg-bgColor text-black">
      {image.map((variant) => (
        <div className="lg:w-1/2" key={variant.id}>
          <NextImage src={variant.src} alt={variant.alt} fit="cover" />
        </div>
      ))}
      <div className="flex relative flex-col flex-1 lg:flex-row px-4  align-bottom lg:items-end mb-14 lg:px-10 lg:gap-12">
        <div className="mt-6 lg:mt-0">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4 uppercase">
            {product.title}
          </h1>
          <p className="lg:leading-12 text-xl lg:text-4xl  font-normal lg:w-80 mb-4  lg:mb-16">
            Keep ‘m cozy during the winter.
          </p>
          <div className="opacity-60 border-t border-b border-gray-400 divide-gray-400 divide-y mb-4 lg:mb-0 pt-4 pb-4 ">
            <p className="pb-4">Padded cotton sweate</p>
            <p className="pt-4">Preoders are shipping this April</p>
          </div>
        </div>
        <div>
          <span>Information</span>
          <p className="opacity-60 mt-2 lg:mt-3">{product.description}</p>
          <div className="mt-8">
            <span>Variant</span>
            <div className="flex my-3">
              {product.variants.map((variant, index) => (
                <Button
                  key={index}
                  value={variant.id}
                  onClick={selectProduct}
                  className={classNames({
                    "rounded focus:outline-none text-sm relative inline-block bg-white border hover:border-primary text-black text-center py-4 w-full mr-4":
                      true,
                    "border-primary": activeButton === variant.id,
                    "border-transparent": activeButton !== variant.id,
                  })}
                >
                  {variant.title}
                </Button>
              ))}
            </div>
            <Link
              href={`/cart?cartid=${cartId}`}
              className="font-bold rounded focus:outline-none text-sm relative  bg-primary flex items-center justify-between hover:bg-blue-500 text-white text-left p-4"
            >
              <span>Buy now</span>
              <span>{state.variant.price.amount}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const product = await getProduct("dog-sweater");
  return {
    props: { product },
  };
};

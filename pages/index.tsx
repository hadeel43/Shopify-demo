import NextImage from "../components/Image/Image";
import Button from "../components/Buttons/Button";
import { ProductService } from "../services/product.service";
import React, { useState } from "react";
import classNames from "classnames";
import { useImmer } from "use-immer";

interface Props {
  product: ProductService.Single;
}
interface State {
  variant: ProductService.Single["variants"][0];
}

export default function Home({ product }: Props) {
  const [state, setState] = useImmer<State>({ variant: product.variants[0] });
  const [activeButton, setActiveButton] = useState(product.variants[0].id);

  const selectProduct = (e: any) => {
    const variant = product.variants.find(({ id }) => id === e.target.value);
    setState((draft) => {
      draft.variant = variant!;
    });
    setActiveButton(e.target.value);
  };

  const image = product.images.filter(
    (image) => image.id === state.variant?.image
  );

  console.log("activeButton", activeButton);
  return (
    <div className="flex flex-col lg:flex-row  h-screen bg-bgColor text-black">
      {image.map((variant) => (
        <div className="lg:w-1/2" key={variant.id}>
          <NextImage src={variant.src} fit="cover" />
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
                    "inset-0 font-normal rounded focus:outline-none text-sm relative inline-block bg-white border hover:border-primary text-black text-center py-4 w-full mr-4":
                      true,
                    "border-primary": activeButton === variant.id,
                    "border-transparent": activeButton !== variant.id,
                  })}
                >
                  {variant.title}
                </Button>
              ))}
            </div>
            <Button className="inset-0 font-normal rounded focus:outline-none text-sm relative  bg-primary flex items-center justify-between juhover:bg-blue-500 text-white text-left p-4 w-full">
              <span>Buy now</span>
              <span>{state.variant.price.amount}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
Home.getInitialProps = async (): Promise<Props> => {
  const product = await ProductService.getSingle("dog-sweater");
  return { product };
};

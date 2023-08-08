import React from "react";
import classNames from "classnames";
import Image from "next/image";

interface Props {
  fit?: string;
  src?: any;
  width?: any;
  height?: any;
}

const NextImage = ({ fit, src, width, height }: Props) => {
  return (
    <Image
      className={classNames({
        "object-cover": fit === "cover",
        "object-contain": fit === "contain",
        "object-fill": fit === "fill",
        "w-full h-full": true,
      })}
      src={src}
      height={height ? height : "1200"}
      width={width ? width : "900"}
      alt=""
    />
  );
};

export default NextImage;

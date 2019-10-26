import React from "react";
import T from "prop-types";
import { config } from "../../config";

const Image = ({ width, height, imgUrl }) => {
  if (!imgUrl) {
    return null;
  }
  return (
    <div>
      <img
        alt="defaul"
        width={width}
        height={height}
        src={`${config.baseUrlImage}${imgUrl}`}
      />
    </div>
  );
};

Image.defaulProps = {
  width: "100px",
  height: "150px",
  imgUrl: null
};
Image.displayName = "Image";
Image.propTypes = {
  width: T.string,
  height: T.string,
  imgUrl: T.string.isRequired
};

export default Image;

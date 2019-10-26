import React from "react";
import T from "prop-types";

const TagB = ({ sizeText, children }) => (
  <b style={{ size: sizeText }}>{children}</b>
);

TagB.defaulProps = { sizeText: "14px" };
TagB.displayName = "Tag <b>";
TagB.propTypes = { sizeText: T.string };

export default TagB;

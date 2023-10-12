import React from "react";
import { getFontSizeForHeading, getTextAlight } from "utils/fonts";

export const Heading = ({ textAlign, content, level = 2 }) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHeading(
      level
    )} ${getTextAlight(textAlign)}`,
  });
  return tag;
};

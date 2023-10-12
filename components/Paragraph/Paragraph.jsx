import { getTextAlight } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ content, textColor, textAlign = "left" }) => {
  return (
    <div>
      <p
        className={`max-w-5xl mx-auto ${getTextAlight(textAlign)}`}
        style={{ color: textColor }}
        dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
      />
    </div>
  );
};

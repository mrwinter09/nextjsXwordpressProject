import { BlockRenderer } from "components/BlockRenderer";
import MainMenu from "components/MainMenu/MainMenu";
export const Page = (props) => {
  return (
    <div>
      <MainMenu
        items={props.mainMenuItems}
        label={props.callToActionLabel}
        destination={props.callToActionDestination}
      />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
};

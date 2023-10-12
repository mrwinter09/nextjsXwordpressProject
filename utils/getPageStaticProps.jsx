import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlock";
import { mapMainMenuItems } from "utils/mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";
  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks
          }
          ... on Property {
            id
            title
            blocks
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
            menuItems {
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });

  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  const mainMenuItems = mapMainMenuItems(
    data.acfOptionsMainMenu.mainMenu.menuItems
  );
  return {
    props: {
      mainMenuItems,
      blocks,
      callToActionLabel:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      title: data.nodeByUri.title,
    },
  };
};

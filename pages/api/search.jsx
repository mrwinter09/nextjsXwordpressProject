import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.hasParking) {
      hasParkingFilter = `
      {
        key: "has_parking"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.petFriendly) {
      hasParkingFilter = `
      {
        key: "pet_friendly"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.minPrice) {
      minPriceFilter = `
      {
        key: "price"
        compare: GREATER_THAN_OR_EQUAL_TO
        value: "${filters.minPrice}"
        type: NUMERIC
      }
      `;
    }
    if (filters.maxPrice) {
      maxPriceFilter = `
      {
        key: "price"
        compare: LESS_THAN_OR_EQUAL_TO
        value: "${filters.maxPrice}"
        type: NUMERIC
      }
      `;
    }

    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties(where: { 
            offsetPagination: { size: 3, offset: ${
              ((filters.page || 1) - 1) * 3
            } }
          metaQuery: {
            relation: AND
            metaArray: [
              ${petFriendlyFilter}
              ${hasParkingFilter}
              ${minPriceFilter}
              ${maxPriceFilter}
            ]
          }
        }) {
            pageInfo {
              offsetPagination {
                total
              }
            }
            nodes {
              uri
              title
              databaseId
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                bathrooms
                hasParking
                petFriendly
                price
                bedrooms
              }
            }
          }
        }
      `,
    });
    console.log("SERVERSIDE: ", data.properties.nodes);
    const properties = data.properties.nodes;
    const total = data.properties.pageInfo.offsetPagination.total;
    return res.status(200).json({
      properties,
      total,
    });
  } catch (e) {
    console.log("Error ", e);
  }
};

export default handler;

import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    posts {
      content {
        html
      }
      cookingTime
      date
      description
      id
      likes
      portions
      premium
      productList {
        html
      }
      refProduct {
        ... on Product {
          productName
          slug
        }
      }
      slug
      title
      foodImages {
        url
      }
    }
  }
`;

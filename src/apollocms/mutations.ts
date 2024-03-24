import { gql } from "@apollo/client";

export const UPDATE_POST=gql`
mutation UpdatePost($likes: Int!, $id: ID!) {
    updatePost(data:{likes:$likes}, where: {id:$id}) {
      likes
      title
      slug
    }
  }
    `
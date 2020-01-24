/* eslint-disable @typescript-eslint/no-var-requires */
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type BasicResponse {
    success: Boolean
    message: String
  }

  type Query {
    hello: String
    files: BasicResponse
  }

  type Mutation {
    uploadFile(files: Upload!, category: String!): BasicResponse
  }
`;

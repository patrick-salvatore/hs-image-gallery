/* eslint-disable @typescript-eslint/no-var-requires */
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type ImageFile {
    name: [String]
  }

  type Query {
    hello: String
    files: ImageFile
  }

  type Mutation {
    uploadFile(files: Upload!, category: String!): Boolean
  }
`;

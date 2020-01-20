/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { existsSync, mkdirSync } from 'fs';

(async () => {
  const PORT = process.env.PORT || 4000;
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  app.get('/upload', (req, res) => {
    res.sendFile(path.resolve('./dist', 'upload.html'));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.resolve('./dist', 'gallery.html'));
  });

  existsSync(path.join(__dirname, './img')) ||
    mkdirSync(path.join(__dirname, './img'));

  app.use(cors());
  app.use(express.static('./dist'));
  app.use('/graphql', bodyParser.json());
  app.use('/img', express.static(path.join(__dirname, './img')));

  server.applyMiddleware({ app });
  app.listen(PORT, () => console.log(`server running @ PORT:${PORT} 🚀`));
})();

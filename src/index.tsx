import React from 'react';
import { render } from 'react-dom';
import { Gallery } from './pages/gallery';
import { Upload } from './pages/upload';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const upload = (
  <ApolloProvider client={client}>
    <Upload />
  </ApolloProvider>
);

const galleryRoot = document.getElementById('img-gallery--root');
const uploadComponentRoot = document.getElementById('upload--root');

if (galleryRoot) {
  render(<Gallery />, galleryRoot);
}

if (uploadComponentRoot) {
  render(upload, uploadComponentRoot);
}

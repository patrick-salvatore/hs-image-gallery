import React from 'react';
import { render } from 'react-dom';
import { Gallery } from './pages/gallery';
import { Upload } from './pages/upload';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const link = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const alertPositions = {
  position: positions.TOP_CENTER,
  timeout: 0,
  width: 600,
  fontSize: 14,
};

const upload = (
  <ApolloProvider client={client}>
    <Provider template={AlertTemplate} {...alertPositions}>
      <Upload />
    </Provider>
  </ApolloProvider>
);

const gallery = (
  <ApolloProvider client={client}>
    <Gallery />
  </ApolloProvider>
);

const galleryRoot = document.getElementById('img-gallery--root');
const uploadComponentRoot = document.getElementById('upload--root');

if (galleryRoot) {
  render(gallery, galleryRoot);
}

if (uploadComponentRoot) {
  render(upload, uploadComponentRoot);
}

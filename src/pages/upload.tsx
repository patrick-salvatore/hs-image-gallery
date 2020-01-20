import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Loader from 'react-loader-spinner';
import gql from 'graphql-tag';
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from '@apollo/react-hooks';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

library.add(faUpload);

const uploadLookup: IconLookup = { prefix: 'fas', iconName: 'upload' };
const uploadIconDefinition: IconDefinition = findIconDefinition(uploadLookup);

const UploadFileMutation = gql`
  mutation uploadFile($files: Upload!, $category: String!) {
    uploadFile(files: $files, category: $category)
  }
`;

const testQuery = gql`
  {
    hello
  }
`;

export const Upload: React.FC = (props): JSX.Element => {
  const [fileCatalogName, setFileCatalogName] = useState<string>('');
  const { loading, error, data } = useQuery(testQuery);
  const [_uploadFileMutaton, res] = useMutation(UploadFileMutation);
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    multiple: true,
  });

  const uploadFiles = () => {
    _uploadFileMutaton({
      variables: { files: acceptedFiles, category: fileCatalogName },
    });
  };

  const setCatalogName = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setFileCatalogName(target.value);
  };

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      <strong>{file.path}</strong> - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      <strong>{file.path}</strong> - {file.size} bytes
    </li>
  ));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '400px',
            height: '400px',
            border: '3px solid',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} type="file" />
          <p>Drag &apos; drop some files here, or click to select files</p>
          <p>(Only *.jpeg/*.jpg and *.png images will be accepted)</p>
          <FontAwesomeIcon icon={uploadIconDefinition} size="3x" />
        </div>
      </section>
      <input
        style={{
          textAlign: 'center',
          marginTop: '16px',
          width: '400px',
          height: '30px',
          border: '1px solid',
          fontFamily: 'Roboto-Bold',
          fontWeight: 'bold',
          fontSize: '20px',
          textTransform: 'uppercase',
          color: 'black',
        }}
        type="text"
        name="js-catalog-name"
        id="js-catalog-name"
        placeholder="Category Name"
        onChange={setCatalogName}
      ></input>
      <div>
        <aside>
          <h4>Accepted files</h4>
          <ol>{acceptedFilesItems}</ol>
          <h4>Rejected files</h4>
          <ol>{rejectedFilesItems}</ol>
        </aside>
      </div>
      {/* <Loader
        type="Oval"
        color="#000"
        height={60}
        width={60}
        // timeout={3000} //3 secs
      /> */}
      <button
        style={{
          marginTop: '20px',
          width: '400px',
          height: '30px',
          backgroundColor: 'black',
          color: 'white',
          border: '1px solid',
        }}
        onClick={uploadFiles}
        disabled={acceptedFiles.length && fileCatalogName.length ? false : true}
      >
        Upload
      </button>
    </div>
  );
};

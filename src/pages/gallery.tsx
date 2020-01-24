import React, { useState } from 'react';
import { Popup } from '../components/popup/popup';
import Loader from 'react-loader-spinner';
import { useFetch } from '../hooks/useFetch';
import { useAlert } from 'react-alert';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import '../scss/index.scss';

const Gallery = ({ scrollPosition }): JSX.Element => {
  const [currImage, setCurrImage] = useState();
  const [imageOpen, setImageOpen] = useState(false);
  const { isBusy, error, rawRes } = useFetch(
    'http://localhost:4000/api/imgFileStore',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const alert = useAlert();

  const isFirstImage = (imgIdx): boolean => {
    if (imgIdx === 0) {
      return true;
    }

    return false;
  };

  const isLastImage = (imgIdx, collection): boolean => {
    if (imgIdx === rawRes[collection].length - 1) {
      return true;
    }

    return false;
  };

  const handleImageClick = (e: any): void => {
    e.preventDefault();
    const [sectionIdx, imgIdx] =
      e.target.getAttribute('data-img').split('-') || [];
    const collection = e.target.getAttribute('data-collection');

    const imgData = rawRes[collection][imgIdx] || {};
    const newState = {
      imgData,
      isFirst: true,
      isLast: true,
      sectionIdx: parseInt(sectionIdx),
      imgIdx: parseInt(imgIdx),
      collection,
    };

    if (parseInt(imgIdx) !== 0) {
      newState.isFirst = false;
    }

    if (parseInt(imgIdx) !== rawRes[collection].length - 1) {
      newState.isLast = false;
    }

    setImageOpen(!imageOpen);
    setCurrImage(newState);
  };

  const closePopUp = (e: React.MouseEvent): void => {
    e.preventDefault();
    setImageOpen(false);
  };

  const handleNextClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const { sectionIdx, imgIdx, collection } = currImage;

    const currStore = rawRes[collection];
    const nextImgIdx = currStore[imgIdx + 1] && imgIdx + 1;
    const nextImgData = currStore[nextImgIdx];
    const nextState = {
      imgData: nextImgData,
      isFirst: false,
      isLast: false,
      sectionIdx,
      imgIdx: nextImgIdx,
      collection,
    };

    nextState.isFirst = isFirstImage(nextImgIdx);
    nextState.isLast = isLastImage(nextImgIdx, collection);

    setCurrImage(nextState);
  };

  const handleBackClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const { sectionIdx, imgIdx, collection } = currImage;
    const currStore = rawRes[collection];
    const prevImgIdx = currStore[imgIdx - 1] && imgIdx - 1;
    const prevImgData = currStore[prevImgIdx];
    const prevState = {
      imgData: prevImgData,
      isFirst: false,
      isLast: false,
      sectionIdx,
      imgIdx: prevImgIdx,
      collection,
    };

    prevState.isFirst = isFirstImage(prevImgIdx);
    prevState.isLast = isLastImage(prevImgIdx, collection);

    setCurrImage(prevState);
  };

  if (error) {
    alert.error('No Images Present');
    return <></>;
  }

  if (!Object.keys(rawRes)) {
    alert.error('No Images Present');
    return <></>;
  }

  return (
    <>
      <>
        {Object.keys(rawRes).map((collection, colIdx) => (
          <div key={colIdx} className="imgSection__wrapper">
            <div className="imgSection_header">{collection || ''}</div>
            <div className="imgSection_images">
              {rawRes[collection].map(
                (
                  img: { src: any; name: string | undefined },
                  imgIdx: string | number | undefined
                ) => (
                  <div
                    key={imgIdx}
                    className="imgSection_images-img"
                    onClick={handleImageClick}
                    data-img={`${colIdx}-${imgIdx}`}
                    data-collection={collection}
                  >
                    <LazyLoadImage
                      scrollPosition={scrollPosition}
                      className="img"
                      data-collection={collection}
                      data-img={`${colIdx}-${imgIdx}`}
                      src={`http://localhost:4000/img/${img.src}`}
                      alt={img.name}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </>
      {imageOpen && (
        <Popup
          closePopUp={closePopUp}
          data={currImage}
          handleNextClick={handleNextClick}
          handleBackClick={handleBackClick}
        />
      )}
      {(isBusy || !rawRes) && (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader type="Oval" color="red" height={300} width={300} />
        </div>
      )}
    </>
  );
};

export default trackWindowScroll(Gallery);

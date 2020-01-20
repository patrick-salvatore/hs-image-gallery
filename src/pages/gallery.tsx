import React, { useState } from 'react';
import { Popup } from '../components/popup/popup';
import '../scss/index.scss';

import img1 from '../img/1.jpg';
import img2 from '../img/2.jpg';
import img3 from '../img/3.jpg';
import img4 from '../img/4.jpg';
import img5 from '../img/5.jpg';
import img6 from '../img/6.jpg';
import img7 from '../img/7.jpg';
import img8 from '../img/8.jpg';

const imageStore = [
  {
    name: 'january',
    store: [
      { src: img1, name: 'test' },
      { src: img2, name: 'test' },
      { src: img3, name: 'test' },
      { src: img4, name: 'test' },
      { src: img5, name: 'test' },
      { src: img6, name: 'test' },
      { src: img7, name: 'test' },
      { src: img8, name: 'test' },
    ],
  },
];

export const Gallery: React.FC = () => {
  const [currImage, setCurrImage] = useState();
  const [imageOpen, setImageOpen] = useState(false);

  const isFirstImage = (imgIdx): boolean => {
    if (imgIdx === 0) {
      return true;
    }

    return false;
  };

  const isLastImage = (imgIdx, sectionIdx): boolean => {
    if (imgIdx === imageStore[sectionIdx].store.length - 1) {
      return true;
    }

    return false;
  };

  const handleImageClick = (e: any): void => {
    e.preventDefault();
    const [sectionIdx, imgIdx] =
      e.target.getAttribute('data-img').split('-') || [];
    const imgData = imageStore[sectionIdx].store[imgIdx] || {};
    const newState = {
      imgData,
      isFirst: true,
      isLast: true,
      sectionIdx: parseInt(sectionIdx),
      imgIdx: parseInt(imgIdx),
    };

    if (parseInt(imgIdx) !== 0) {
      newState.isFirst = false;
    }

    if (parseInt(imgIdx) !== imageStore[sectionIdx].store.length - 1) {
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
    const { sectionIdx, imgIdx } = currImage;
    const currStore = imageStore[sectionIdx].store;
    const nextImgIdx = currStore[imgIdx + 1] && imgIdx + 1;
    const nextImgData = currStore[nextImgIdx];
    const nextState = {
      imgData: nextImgData,
      isFirst: false,
      isLast: false,
      sectionIdx,
      imgIdx: nextImgIdx,
    };

    nextState.isFirst = isFirstImage(nextImgIdx);
    nextState.isLast = isLastImage(nextImgIdx, sectionIdx);

    setCurrImage(nextState);
  };

  const handleBackClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const { sectionIdx, imgIdx } = currImage;
    const currStore = imageStore[sectionIdx].store;
    const prevImgIdx = currStore[imgIdx - 1] && imgIdx - 1;
    const prevImgData = currStore[prevImgIdx];
    const prevState = {
      imgData: prevImgData,
      isFirst: false,
      isLast: false,
      sectionIdx,
      imgIdx: prevImgIdx,
    };

    prevState.isFirst = isFirstImage(prevImgIdx);
    prevState.isLast = isLastImage(prevImgIdx, sectionIdx);

    setCurrImage(prevState);
  };

  return (
    <>
      {imageStore.map((collection, colIdx) => (
        <div key={colIdx} className="imgSection__wrapper">
          <div className="imgSection_header">{collection.name || ''}</div>
          <div className="imgSection_images">
            {collection.store.map((img, imgIdx) => (
              <div
                key={imgIdx}
                className="imgSection_images-img"
                onClick={handleImageClick}
                data-img={`${colIdx}-${imgIdx}`}
              >
                <img
                  className="img"
                  data-img={`${colIdx}-${imgIdx}`}
                  src={img.src}
                  alt={img.name}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      {imageOpen && (
        <Popup
          closePopUp={closePopUp}
          data={currImage}
          handleNextClick={handleNextClick}
          handleBackClick={handleBackClick}
        />
      )}
    </>
  );
};

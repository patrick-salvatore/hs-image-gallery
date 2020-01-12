import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/5.jpg';
import img6 from './img/6.jpg';
import img7 from './img/7.jpg';
import img8 from './img/8.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

// import {
//   IconLookup,
//   IconDefinition,
//   findIconDefinition,
//   library,
// } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faChevronRight,
//   faChevronLeft,
// } from '@fortawesome/free-solid-svg-icons';

// library.add(faChevronRight, faChevronLeft);

// const chevronRLookup: IconLookup = { prefix: 'fas', iconName: 'chevron-right' };
// const chevronRIconDefinition: IconDefinition = findIconDefinition(
//   chevronRLookup
// );
// const chevronLLookup: IconLookup = { prefix: 'fas', iconName: 'chevron-left' };
// const chevronLIconDefinition: IconDefinition = findIconDefinition(
//   chevronLLookup
// );

const Gallery: React.SFC = () => {
  const [currImage, setCurrImage] = useState();
  const [imageOpen, setImageOpen] = useState(false);

  const handleImageClick = (): void => {};

  return (
    <div className="image-gallery__wrapper">
      <h1>Gallery</h1>
      {images.map((el, i) => (
        <img key={i} src={el} alt="test" />
      ))}

      {imageOpen && <>Image Modal</>}
    </div>
  );
};

Gallery.propTypes = {};

const galleryRoot = document.getElementById('img-gallery--root');

if (galleryRoot) ReactDOM.render(<Gallery />, galleryRoot);

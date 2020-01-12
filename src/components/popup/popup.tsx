import React from 'react';
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

library.add(faChevronRight, faChevronLeft, faTimes);

const chevronLLookup: IconLookup = { prefix: 'fas', iconName: 'chevron-left' };
const chevronRLookup: IconLookup = { prefix: 'fas', iconName: 'chevron-right' };
const timesLookup: IconLookup = { prefix: 'fas', iconName: 'times' };
const chevronRIconDefinition: IconDefinition = findIconDefinition(
  chevronRLookup
);
const timesIconDefinition: IconDefinition = findIconDefinition(timesLookup);
const chevronLIconDefinition: IconDefinition = findIconDefinition(
  chevronLLookup
);

interface IPopupProps {
  data: {
    imgData: { src: string; name: string; desc: string };
    isFirst: boolean;
    isLast: boolean;
  };
  closePopUp: (e: React.MouseEvent) => void;
  handleNextClick: (e: React.MouseEvent) => void;
  handleBackClick: (e: React.MouseEvent) => void;
}

export const Popup: React.SFC<IPopupProps> = ({
  data: {
    imgData: { src, name, desc },
    isFirst,
    isLast,
  },
  closePopUp,
  handleNextClick,
  handleBackClick,
}): JSX.Element => {
  return (
    <div className="popUp__wrapper">
      <div className="popUp_close--btn" onClick={closePopUp}>
        <FontAwesomeIcon
          className="popUp--icon"
          icon={timesIconDefinition}
          size="2x"
        />
      </div>
      <div className="popUp__contents">
        <div className="popUp__contents">
          <FontAwesomeIcon
            className={isFirst ? 'popUp--icon hidden' : 'popUp--icon'}
            data-id="back"
            onClick={handleBackClick}
            icon={chevronLIconDefinition}
            size="2x"
          />
          <div className="popUp__contents--img__wrapper">
            <img className="popUp__contents--img" src={src} alt={name} />
            <p className="popUp__contents--desc">{desc || ''}</p>
          </div>
          <FontAwesomeIcon
            className={isLast ? 'popUp--icon hidden' : 'popUp--icon'}
            icon={chevronRIconDefinition}
            size="2x"
            data-id="next"
            onClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

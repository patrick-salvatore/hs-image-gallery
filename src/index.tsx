import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface IPindex {
  name: string;
}

const Index: React.SFC<IPindex> = (props) => {
  return <div>{props.name}</div>;
};

Index.propTypes = {};

const root = document.getElementById("img-gallery--root")

ReactDOM.render(<Index name={'patrick'}/>, root)

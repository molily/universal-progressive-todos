import React from 'react';

// Mixes the data into the props
export default (dataProp, data, Component, props) => {
  const newProps = { ...props, [dataProp]: data };
  return <Component {...newProps}/>;
};

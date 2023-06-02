import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: '1rem',
  };

  return (
    <h2 style={titleStyle}>
      {props.children}
    </h2>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;

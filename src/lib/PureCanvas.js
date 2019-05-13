import React from 'react';
import PropTypes from 'prop-types';

const PureCanvas = props => (
  <canvas
    width={props.width}
    height={props.height}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    }}
    ref={node => (node ? props.contextRef(node.getContext('2d')) : null)}
  />
);

PureCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  contextRef: PropTypes.func.isRequired
};

export default PureCanvas;

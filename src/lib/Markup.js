import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useGesture } from 'react-use-gesture';

const PureCanvas = props => (
  <canvas
    style={props.style}
    width="800"
    height="600"
    ref={node => (node ? props.contextRef(node.getContext('2d')) : null)}
  />
);

const Markup = ({ children, onSelect = () => {} }) => {
  const selection = useRef();
  const context = useRef();

  const handleCanvasRef = ctx => {
    context.current = ctx;
    requestAnimationFrame(() => draw());
  };

  const select = useGesture({
    onDrag: ({ initial, delta }) => {
      const [startX, startY] = initial;
      const [deltaX, deltaY] = delta;
      selection.current = [startX, startY, deltaX, deltaY];
    },
    onDragEnd: state => {
      onSelect(selection.current);
    }
  });

  function draw() {
    const ctx = context.current;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (selection.current) {
      const [x, y, w, h] = selection.current;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.strokeRect(x, y, w, h);
    }

    requestAnimationFrame(() => draw());
  }

  return (
    <div {...select()}>
      {children}
      <PureCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
        contextRef={handleCanvasRef}
      />
    </div>
  );
};

Markup.propTypes = {
  onSelect: PropTypes.func
};

export default Markup;

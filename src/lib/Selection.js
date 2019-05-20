import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGesture } from 'react-use-gesture';
import PureCanvas from './PureCanvas';

const percent = ([w, h], [x, y, dx, dy]) => [x / w, y / h, dx / w, dy / h];

const SelectionArea = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      display: 'inline-block'
    }}
    {...props}
  >
    {props.children}
  </div>
));

const Selection = ({ onSelect = () => {}, paused = false, ...props }) => {
  const area = useRef();
  const context = useRef();
  const selection = useRef();
  const [[w, h], setCanvasDimensions] = useState([0, 0]);

  useEffect(() => {
    const { clientWidth, clientHeight } = area.current;
    setCanvasDimensions([clientWidth, clientHeight]);
  }, []);

  const handleCanvasRef = ctx => {
    context.current = ctx;
    requestAnimationFrame(() => draw());
  };

  const select = useGesture({
    onDrag: ({ initial, delta }) => {
      if (paused) return;
      let [startX, startY] = initial;
      let [deltaX, deltaY] = delta;

      if (startX + deltaX > w) {
        deltaX = w - startX;
      }

      if (startX + deltaX < 0) {
        deltaX = 0 - startX;
      }

      if (startY + deltaY > h) {
        deltaY = h - startY;
      }

      if (startY + deltaY < 0) {
        deltaY = 0 - startY;
      }

      selection.current = [startX, startY, deltaX, deltaY];
    },
    onDragEnd: () => {
      if (paused) return;
      let [startX, startY, deltaX, deltaY] = selection.current;
      if (deltaX === 0 || deltaY === 0) return; // prevent firing on click

      // if deltas are negative, flip so everything is positive
      if (deltaX < 0) {
        startX = startX + deltaX;
        deltaX = Math.abs(deltaX);
      }

      if (deltaY < 0) {
        startY = startY + deltaY;
        deltaY = Math.abs(deltaY);
      }

      const raw = [startX, startY, deltaX, deltaY];
      const pct = percent([w, h], raw);

      onSelect({ raw, pct });
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
    <>
      <SelectionArea {...props} ref={area} {...select()}>
        {props.children}
      </SelectionArea>
      <PureCanvas width={w} height={h} contextRef={handleCanvasRef} />
    </>
  );
};

Selection.propTypes = {
  onSelect: PropTypes.func,
  paused: PropTypes.bool
};

export default Selection;

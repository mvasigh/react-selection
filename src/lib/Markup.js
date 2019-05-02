import React, { useState, useRef } from 'react';
import { useGesture } from 'react-use-gesture';
import { useSpring, animated, config, interpolate } from 'react-spring';

const MAX_SCALE = 8;
const MIN_SCALE = 0.2;

const limit = scale => {
  if (scale > MAX_SCALE) {
    return MAX_SCALE;
  } else if (scale < MIN_SCALE) {
    return MIN_SCALE;
  } else {
    return scale;
  }
};

const Markup = ({ src }) => {
  const [{ xy, scale }, set] = useSpring(() => ({
    xy: [0, 0],
    scale: 1,
    config: config.default
  }));
  const bind = useGesture({
    onDrag: ({ local }) => set({ xy: local }),
    onWheel: ({ xy: [, y], previous: [, lastY] }) => {
      let s = scale.getValue();
      let diff = -(y - lastY);
      let newScale = s + (diff / 50) * s;
      set({ scale: limit(newScale) });
    }
  });

  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw'
      }}
      {...bind()}
    >
      <animated.div
        style={{
          transform: interpolate(
            [xy, scale],
            ([x, y], scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          )
        }}
      >
        <img src={src} draggable="false" />
      </animated.div>
    </div>
  );
};

export default Markup;

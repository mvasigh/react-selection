import React from 'react';
import { useGesture } from 'react-use-gesture';
import { useSpring, animated, config, interpolate } from 'react-spring';

const limit = (max, min, scale) => {
  if (scale > max) {
    return max;
  } else if (scale < min) {
    return min;
  } else {
    return scale;
  }
};

const Panzoom = ({ children, maxZoom = 8, minZoom = 0.2 }) => {
  const [{ xy, scale }, set] = useSpring(() => ({
    xy: [0, 0],
    scale: 1,
    config: config.default
  }));
  const pan = useGesture({
    onDrag: ({ local }) => set({ xy: local })
  });
  const zoom = useGesture({
    onWheel: ({ xy: [, y], previous: [, lastY] }) => {
      let s = scale.getValue();
      let diff = -(y - lastY);
      let newScale = s + (diff / 50) * s;
      set({ scale: limit(maxZoom, minZoom, newScale) });
    }
  });

  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw'
      }}
      {...pan()}
    >
      <animated.div
        {...zoom()}
        style={{
          transform: interpolate(
            [xy, scale],
            ([x, y], scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          )
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default Panzoom;

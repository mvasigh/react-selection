import React from 'react';
import { render } from 'react-dom';
import { Panzoom, Markup } from './src/lib';
import './index.css';
import cat from './cat.jpg';

const App = props => {
  return (
    <Panzoom maxZoom={2} minZoom={0.2}>
      <img src={cat} draggable={false} />
    </Panzoom>
  );
};

render(<App />, document.getElementById('app'));

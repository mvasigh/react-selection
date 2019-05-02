import React from 'react';
import { render } from 'react-dom';
import { Markup } from './src/lib';
import './index.css';

const IMAGE_SRC = 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1509a.jpg';

const App = props => {
  return <Markup src={IMAGE_SRC} />;
};

render(<App />, document.getElementById('app'));

import React from 'react';
import { render } from 'react-dom';
import { Markup } from './src/lib';
import './index.css';

const Box = () => (
  <div
    style={{
      height: '600px',
      width: '600px',
      background: 'salmon'
    }}
  >
    Mark me up
  </div>
);

const App = props => {
  return (
    <Markup onSelect={selection => console.log(selection)}>
      <Box />
    </Markup>
  );
};

render(<App />, document.getElementById('app'));

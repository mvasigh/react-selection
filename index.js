import React from 'react';
import { render } from 'react-dom';
import { Selection } from './src/lib';
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
    <Selection onSelect={selection => console.log(selection)}>
      <Box />
    </Selection>
  );
};

render(<App />, document.getElementById('app'));

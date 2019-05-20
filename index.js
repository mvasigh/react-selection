import React, { useState } from 'react';
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
  const [paused, setPaused] = useState(false);

  const togglePause = () => setPaused(!paused);

  return (
    <React.Fragment>
      <Selection paused={paused} onSelect={selection => console.log(selection)}>
        <Box />
      </Selection>
      <div>
        <button onClick={togglePause}>{paused ? 'Resume' : 'Pause'}</button>
      </div>
    </React.Fragment>
  );
};

render(<App />, document.getElementById('app'));

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Markup } from './src/lib';

const App = props => {
  return <Markup />
}

render(<App />, document.getElementById('app'));
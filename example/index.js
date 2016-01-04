// import 'purecss';
// import 'react-ghfork/gh-fork-ribbon.ie.css';
// import 'react-ghfork/gh-fork-ribbon.css';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

main();

function main() {
  const app = document.querySelector('#app');
  ReactDOM.render(<App />, app);
}

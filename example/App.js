import React from 'react'
import QuillTextEditor from '../src/QuillTextEditor'

import 'quill/dist/quill.snow.css'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React Quill Demo</h1>
        <QuillTextEditor />
      </div>
    );
  }
}

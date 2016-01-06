import React from 'react'
import QuillTextEditor from '../src/QuillTextEditor'

import 'quill/dist/quill.snow.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.onTextChange = this.onTextChange.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
  }

  render() {
    return (
      <div>
        <h1>React Quill Demo</h1>
        <QuillTextEditor
          ref={ref => this.editor = ref }
          onTextChange={this.onTextChange}
          onSelectionChange={this.onSelectionChange}/>
      </div>
    );
  }

  onTextChange(delta, source) {
    if (source == 'api') {
      console.log("An API call triggered this change.", this.editor.quill.getHTML());
    } else if (source == 'user') {
      console.log("A user action triggered this change.", this.editor.quill.getHTML());
    }
  }

  onSelectionChange(range) {
    if (range) {
      if (range.start == range.end) {
        console.log('User cursor is on', range.start);
      } else {
        var text = editor.getText(range.start, range.end);
        console.log('User has highlighted', text);
      }
    } else {
      console.log('Cursor not in the editor');
    }
  }
}

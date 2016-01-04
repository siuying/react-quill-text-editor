import React from 'react'
import Quill from 'quill'

require('quill/dist/quill.snow.css')

export default class QuillTextEditor extends React.Component {
  componentDidMount() {
    this.quill = new Quill(this._editor, {
      theme: 'snow'
    })
    this.quill.addModule('toolbar', {
      container: this._toolbar
    });
  }

  render() {
    return (
      <div>
        <div ref={ (ref) => this._toolbar = ref }>
          <select className="ql-size" defaultValue="13px">
            <option value="10px">Small</option>
            <option value="13px">Normal</option>
            <option value="18px">Large</option>
            <option value="32px">Huge</option>
          </select>

          <span className="ql-format-group">
            <button className="ql-bold">Bold</button>
            <button className="ql-italic">Italic</button>
            <button className="ql-strike">Strike</button>
            <button className="ql-underline">Underline</button>
            <button className="ql-link">Link</button>
          </span>

          <span className="ql-format-separator" />

          <span className="ql-format-group">
            <button className="ql-background">Background</button>
            <button className="ql-color">Color</button>
            <button className="ql-font">Font</button>
            <button className="ql-size">Size</button>
          </span>
        </div>

        <div ref={ (ref) => this._editor = ref }>
        </div>
      </div>
    );
  }
}

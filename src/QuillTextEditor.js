import React from 'react'
import Quill from 'quill'
import UUID from 'uuid'
import Toolbar from './Toolbar'


export default class QuillTextEditor extends React.Component {
  constructor(props) {
    super(props)
    this._id = UUID.v4()
  }

  componentDidMount() {
    const toolbarId = this.props.toolbar || `#toolbar-${this._id}`
    this.quill = new Quill(`#editor-${this._id}`, {
      theme: this.props.theme
    })
    this.quill.addModule('toolbar', {
      container: toolbarId
    })
    this.quill.on('text-change', this.props.onTextChange)
    this.quill.on('selection-change', this.props.onSelectionChange)
  }

  componentWillUnmount() {
    if (this.quill) {
      this.quill.off('text-change', this.props.onTextChange)
      this.quill.off('selection-change', this.props.onSelectionChange)
      this.quill.destroy()
      this.quill = null
    }
  }

  render() {
    const toolbar = this.props.toolbar ? null : (<Toolbar id={`toolbar-${this._id}`}></Toolbar>)
    return (
      <div className="quill-wrapper">
        {toolbar}
        <div id={`editor-${this._id}`}>
        </div>
      </div>
    );
  }
}

QuillTextEditor.propTypes = {
  toolbar: React.PropTypes.string,
  theme: React.PropTypes.string,
  onTextChange: React.PropTypes.func,
  onSelectionChange: React.PropTypes.func,
}

QuillTextEditor.defaultProps = {
  theme: 'snow',
  onTextChange: (delta, source) => {},
  onSelectionChange: (range) => {},
}

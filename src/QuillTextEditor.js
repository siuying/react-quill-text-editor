import React from 'react'
import Quill from 'quill'
import UUID from 'uuid'
import Toolbar from './Toolbar'

const dirtyProps = [
	'id',
	'className',
	'modules',
	'toolbar',
	'styles',
	'theme'
]

export default class QuillTextEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {value: this.props.value, selection: null}
    this.onTextChange = this.onTextChange.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
    this._id = UUID.v4()
  }

  componentDidMount() {
    const toolbarId = this.props.toolbar || `#toolbar-${this._id}`
    this.quill = new Quill(`#editor-${this._id}`, {
      readOnly: this.props.readOnly,
      theme: this.props.theme,
      formats: this.props.formats,
      styles: this.props.styles,
      modules: this.props.modules,
      pollInterval: this.props.pollInterval,
    })
    this.quill.addModule('toolbar', {
      container: toolbarId
    })
    this.quill.on('text-change', this.onTextChange)
    this.quill.on('selection-change', this.onSelectionChange)
  }

  componentWillUnmount() {
    if (this.quill) {
      this.quill.off('text-change', this.onTextChange)
      this.quill.off('selection-change', this.onSelectionChange)
      this.quill.destroy()
      this.quill = null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.quill) {
      return
    }

		// Update only if we've been passed a new `value`.
		// This leaves components using `defaultValue` alone.
    if ('value' in nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({value: nextProps.value})
      }
    }

    if ('readOnly' in nextProps) {
      if (nextProps.readOnly !== this.state.readOnly) {
        if (nextProps.readOnly) {
          this.quill.disable()
        } else {
          this.quill.enable()
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (var prop of dirtyProps) {
      if (nextProps[prop] !== this.props[prop]) {
        return true
      }
    }
    return false
  }

  onTextChange(delta, source) {
    const html = this.quill.getHTML()
    if (html !== this.state.value) {
      this.setState({value: html})
      this.props.onTextChange(html, delta, source)
    }
  }

  onSelectionChange(range) {
    if (!this.state.selection || range !== this.state.selection ||
      range.start != this.state.selection.start || range.end != this.state.selection.end) {
      this.setState({selection: range})
      this.props.onSelectionChange(range)
    }
  }

  render() {
    const toolbar = this.props.toolbar ? null : (<Toolbar id={`toolbar-${this._id}`}></Toolbar>)
    return (
      <div className="quill-wrapper">
        {toolbar}
        <div
          id={`editor-${this._id}`}
          dangerouslySetInnerHTML={{__html: this.state.value}}>
        </div>
      </div>
    );
  }
}

QuillTextEditor.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  toolbar: React.PropTypes.string,
  formats: React.PropTypes.array,
  modules: React.PropTypes.array,
  styles: React.PropTypes.array,
  theme: React.PropTypes.string,
  onTextChange: React.PropTypes.func,
  onSelectionChange: React.PropTypes.func,
}

QuillTextEditor.defaultProps = {
  className: '',
  theme: 'base',
  onTextChange: (delta, source) => {},
  onSelectionChange: (range) => {},
}

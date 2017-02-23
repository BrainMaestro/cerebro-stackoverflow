const React = require('react');

/**
 * Focus element with index from elements array.
 *   If `index` >= `elements.length` then first element is selected;
 *   If `index` <= 0 then last element is selected.
 *
 * @param  {Array<DOMElement>} elements
 * @param  {Integer} index
 */
const moveSelectionTo = (elements, index, goBack) => {
  let nextIndex = index
  if (index < 0) {
    nextIndex = elements.length - 1
  } else if (index >= elements.length) {
    nextIndex = 0
  }
  elements[nextIndex].focus()
}

/**
 * Handler keydown in keyboard navigation component
 *
 * @param  {DOMElement} wrapper
 * @param  {KeyboardEvent} event
 * @param  {Function} goBack
 */
const onKeyDown = (wrapper, event, goBack) => {
  const { target, keyCode } = event

  // Get all focusable elements in element
  const focusable = wrapper.querySelectorAll('[tabindex]')
  // console.log(focusable, wrapper)

  // Get index of currently focused element
  const index = Array.from(focusable).findIndex(el => el === target)

  switch (keyCode) {
    case 37:
      event.preventDefault()
      event.stopPropagation()
      goBack()
      break
    case 13: case 39:
      target.click()
      break
    case 38:
      // Select previous focusable element when arrow down clicked
      moveSelectionTo(focusable, index - 1)
      event.stopPropagation()
      break
    case 40:
      // Select next focusable element when arrow down clicked
      moveSelectionTo(focusable, index + 1)
      event.stopPropagation()
      break
    default:
      return false
  }
}

class KeyboardNav extends React.Component {
  componentDidMount() {
    this.wrapper.querySelectorAll('[tabindex]')[0].focus()
  }

  onKeyDown(event) {
    onKeyDown(this.wrapper, event, this.props.goBack)
  }

  render() {
    return (
      <div onKeyDown={this.onKeyDown.bind(this)} ref={(el) => { this.wrapper = el }}>
        {this.props.children}
      </div>
    )
  }
}

KeyboardNav.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
  ]),
  goBack: React.PropTypes.func,
};

KeyboardNav.defaultProps = {
  goBack: () => {
    const mainInput = document.querySelector('#main-input')
    const position = mainInput.value.length
    mainInput.focus()
    mainInput.setSelectionRange(position, position)
  }
}

module.exports = KeyboardNav;

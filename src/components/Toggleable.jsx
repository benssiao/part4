import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from 'prop-types'

const Toggleable = forwardRef(({ showLabel, hideLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div className="toggleable-container">
      {!visible && (
        <div className="toggle-button-wrapper">
          <button onClick={toggleVisibility}>{showLabel}</button>
        </div>
      )}
      {visible && (
        <div className="toggle-content-wrapper">
          <div className="toggle-content">
            {children}
          </div>
          <button onClick={toggleVisibility}>{hideLabel}</button>
        </div>
      )}
    </div>
  )
})

Toggleable.displayName = 'Toggleable'
Toggleable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
}
export default Toggleable
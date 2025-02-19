import { useState, useImperativeHandle, forwardRef } from 'react'

const Toggleable = forwardRef(({ showLabel, hideLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  function toggleVisibility() {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick = {toggleVisibility}>{showLabel}</button>
      </div>
      <div style={{ ...showWhenVisible, display: visible ? 'flex' : 'none', alignItems: 'center', gap: '8px' }}>
        {children} <button onClick={toggleVisibility}>{hideLabel}</button>
      </div>
    </div>
  )
}
)

Toggleable.displayName = 'Toggleable'

export default Toggleable
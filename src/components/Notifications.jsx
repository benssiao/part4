import { useState, useEffect } from 'react'
function ErrorNotification({ message }) {
  if (message === null) {
    return null
  }
  return (
    <div className="errorNotification">
      {message}
    </div>
  )

}

function ConfirmationNotification({ message }) {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

export { ErrorNotification, ConfirmationNotification }
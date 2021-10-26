import React from 'react'

function Bookmark ({ status, ...rest }) {
  return (
    <button {...rest}>
      <i className={'bi bi-bookmark' + (status ? '-fill' : '')}> </i>
    </button>
  )
}

export default Bookmark
import React from 'react'
import "./Loader.scss"
type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="loader-container">
        <div className="loader"></div>
      </div>
  )
}

export default Loader
import React from 'react'
import "./Loader.scss"
import { NavLink } from 'react-router-dom';

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="loader-container">
        <div className="loader"></div>
      </div>
  )
}

export default Loader
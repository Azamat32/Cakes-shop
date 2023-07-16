import React from 'react'

type SliderProps = {
    SliderImage?: string,
}

const SliderItem = (props: SliderProps) => {
    const {SliderImage} = props
  return (
    <div>
        <img src={SliderImage} alt="" />
    </div>
  )
}

export default SliderItem
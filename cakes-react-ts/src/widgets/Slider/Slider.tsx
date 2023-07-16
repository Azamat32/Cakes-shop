import React, { useState } from 'react';
import './Slider.scss';
import SliderItem from './ SliderItem/SliderItem';

type SliderProps = {
  sliderData?: { img: string }[];
};

const Slider = (props: SliderProps) => {
  const { sliderData } = props;
  const [activeSlide, setActiveSlide] = useState(0);

  

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="slider">
      {sliderData && (
        <SliderItem SliderImage={sliderData[activeSlide].img} />
      )}

      <div className="pagination">
        {sliderData &&
          sliderData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
      </div>

      
    </div>
  );
};

export default Slider;

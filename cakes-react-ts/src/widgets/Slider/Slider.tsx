import  { useState, useRef, useEffect } from "react";
import "./Slider.scss";
import SliderItem from "./ SliderItem/SliderItem";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

type SliderProps = {
  sliderData: { img: string }[];
};

const Slider = (props: SliderProps) => {
  const { sliderData } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (sliderRef.current) {
        const newSlide = (activeSlide + 1) % sliderData.length;
        setActiveSlide(newSlide);
        sliderRef.current.swiper.slideTo(newSlide); // Update slideTo method access
      }
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [activeSlide, sliderData.length]);

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
    if (sliderRef.current) {
      sliderRef.current.swiper.slideTo(index); // Update slideTo method access
    }
  };

  return (
    <div className="slider">
      {sliderData.length > 0 && (
        <>
          <Swiper
            
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            ref={sliderRef}
          >
            {sliderData.map((data, index) => (
              <SwiperSlide key={index}>
                <SliderItem SliderImage={data.img} />
              </SwiperSlide>
            ))}
             <div className="pagination">
            {sliderData.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
          </Swiper>

         
        </>
      )}
    </div>
  );
};

export default Slider;

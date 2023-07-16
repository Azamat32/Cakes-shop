import Slider from "../../widgets/Slider/Slider" 
type Props = {}

const MainPage = (props: Props) => {
  const images = [
    { img: 'image1.jpg' },
    { img: 'image2.jpg' },
    { img: 'image3.jpg' },
  ];
  return (
    <div>
      <Slider sliderData={images}  />
    </div>
  )
}

export default MainPage
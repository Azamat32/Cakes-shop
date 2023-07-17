import Slider from "../../widgets/Slider/Slider";
import Examle1 from "../../assets/ExampleGallery/conditer1.jpg";
import Examle2 from "../../assets/ExampleGallery/conditer2.jpg";

import Examle3 from "../../assets/ExampleGallery/conditer3.jpg";

type Props = {};

const MainPage = (props: Props) => {
  const images = [
    { img: Examle1 },
    { img: Examle2 },
    { img: Examle3 },
  ];
  return (
    <div className="container">
      <Slider sliderData={images} />
    </div>
  );
};

export default MainPage;

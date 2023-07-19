type Props = {};
import Examle3 from "../../assets/ExampleGallery/conditer3.jpg";
import "./AboutPage.scss"
const AboutPage = (_props: Props) => {
  return (
    <div className="about">
      <div className="container">
        <div className="about_inner">
          <div className="about_wrap">
            <div className="about_left">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus pariatur nisi facere at similique dolor quod a
                dignissimos, molestiae, rerum aliquid? Fugiat pariatur explicabo
                sapiente nihil facilis distinctio veniam reprehenderit!
              </p>
            </div>
            <div className="about_right">
                  <img src={Examle3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

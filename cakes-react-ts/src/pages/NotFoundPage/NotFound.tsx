import { NavLink } from "react-router-dom";
import "./NotFound.scss";


type Props = {};
const NotFound = (_props: Props) => {
  return (
      <div className="not-found-page">
        <div className="content">
          <h1>404 - Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <NavLink to="/" className="back-to-home-btn">
            Back to Home
          </NavLink>
        </div>
      </div>
  );
};

export default NotFound;

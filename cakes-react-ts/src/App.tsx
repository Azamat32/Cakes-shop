import { BrowserRouter } from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes"
import "./App.css";
import Navbar from "./widgets/Navbar/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

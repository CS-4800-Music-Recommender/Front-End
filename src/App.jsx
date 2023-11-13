// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Test from "./pages/Test";
import Splashscreen from "./pages/Splashscreen";
import image from "./images/image.png";

function App() {
  return (
    <div style={{ backgroundImage: `url(${image})` , backgroundSize: "cover" , backgroundRepeat: "no-repeat" , height: "100vh", }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Splashscreen/>}
          />
          <Route
            path="/test"
            element={<Test />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

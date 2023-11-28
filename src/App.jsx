// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Register from "./pages/Register";
import Splashscreen from "./pages/Splashscreen";
import image from "./images/image.png";
import Login from "./pages/Login";
import Test from "./pages/Test";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Splashscreen />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/playlist"
            element={<Test />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Test from "./pages/Test";
import Splashscreen from "./pages/Splashscreen";
import image from "./images/image.png";
import Login from "./pages/Login";
import PlaylistPage from "./pages/PlaylistPage";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splashscreen />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

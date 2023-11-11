import "./App.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Test from "./pages/Test";
import Splashscreen from "./pages/splashscreen";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;

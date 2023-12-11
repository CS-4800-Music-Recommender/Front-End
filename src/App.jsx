import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Splashscreen from "./pages/Splashscreen";
import image from "./images/image.png";
import Login from "./pages/Login";
import PlaylistPage from "./pages/PlaylistPage";
import Test from "./pages/Test";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./context/UserContext";
import { useState, useEffect } from "react";

function App() {
  const { user } = useAuth0();
  const [accessToken, setAccessToken] = useState({});

  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${
        import.meta.env.VITE_SPOTIFY_API_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_SPOTIFY_API_CLIENT_SECRET}`,
    };
    async function getAccessToken() {
      await fetch("https://accounts.spotify.com/api/token", authParams)
        .then((res) => res.json())
        .then((data) => {
          setAccessToken(data.access_token);
        });
    }
    getAccessToken();
  }, []);
  return (
    <UserContext.Provider value={{user, accessToken}}>
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
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;

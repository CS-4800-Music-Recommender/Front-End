import {
  Container,
  Row,
  Col,
  Image,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import logo from "../images/splashscreen/bpm-logo.png";
import { List } from "react-bootstrap-icons";
import { ListGroup } from "react-bootstrap/esm";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTUuFCEWK78XM31h-bqOVw-DfEiGy74as",
  authDomain: "cs-4800.firebaseapp.com",
  projectId: "cs-4800",
  storageBucket: "cs-4800.appspot.com",
  messagingSenderId: "255169053476",
  appId: "1:255169053476:web:de84c4f972abf63cea69b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


const PlaylistPage = () => {
  const [accessToken, setAccessToken] = useState({});
  const [searchBox, setSearchBox] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
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

  async function search(inputtedSong) {
    let songParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        inputtedSong +
        "&type=track&limit=1",
      songParams
    );
    const data = await response.json();
    return data;
  }

  const handleInputChange = (event) => {
    setSearchBox(event.target.value);
  };

  const extractTrackID = (data) => {
    return data.tracks.items[0].id;
  };
  const getRecommendation = async (trackID) => {
    let recommendationParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      "https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=" +
        trackID,
      recommendationParams
    );
    const data = await response.json();
    data.tracks.forEach((track) => {
      setRecommendations((prevList) => [...prevList, track.name]);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPlaylist((prevList) => [...prevList, searchBox]);
    const trackData = await search(searchBox);
    const trackID = extractTrackID(trackData);
    await getRecommendation(trackID);
    setSearchBox("");
  };

  return (
    <Container fluid className="p-5 text-center ">
      <Row>
        <Col>
          <List size={70} />
        </Col>
        <Col xs={8}>
          <Image src={logo} width={300} fluid />
        </Col>
      </Row>
      <Row className="mx-5">
        <Col xs={4}>
          <div className="text-center" style={{ width: "50%" }}>
            <Row>
              <Button
                variant="success"
                to="/playlist"
                className="my-3 p-3 fs-5 mx-5"
              >
                Export Playlist
              </Button>
            </Row>
            <Row>
              <Button
                variant="success"
                to="/playlist"
                className="my-3 p-3 fs-5 mx-5"
              >
                Import Playlist
              </Button>
            </Row>

            <Row>
              <Button
                variant="success"
                to="/playlist"
                className="my-3 p-3 fs-5 mx-5"
              >
                Create Playlist
              </Button>
            </Row>
          </div>
          <Row>
            <InputGroup className="mb-3" style={{ width: "90%" }}>
              <Form.Control
                placeholder="Search Song or Artist"
                aria-label="Search Song or Artist"
                aria-describedby="basic-addon2"
                value={searchBox}
                onChange={handleInputChange}
              />
              <Button variant="outline-secondary" id="button-addon2">
                Artist
              </Button>
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleSubmit}
              >
                Song
              </Button>
            </InputGroup>
          </Row>
        </Col>
        <Col>
          <div
            className="text-center "
            style={{ width: "80%", height: "500px" }}
          >
            <h1>Recommended Songs</h1>
            <div
              className="text-center overflow-auto"
              style={{ width: "80%", height: "500px" }}
            >
              <ListGroup className="fs-5 overflow-auto">
                {recommendations.map((song, key) => (
                  <ListGroup.Item key={key} action>
                    {song}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </Col>
        <Col>
          <div className="text-center " style={{ width: "80%" }}>
            <h1>Current Playlist</h1>
          </div>
          <div
            className="text-center overflow-auto"
            style={{ width: "80%", height: "500px" }}
          >
            <ListGroup className="fs-5">
              {playlist.map((song, key) => (
                <ListGroup.Item key={key} action>
                  {song}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
      <Row className="bg-dark">
        {/* Plans for here would be to fully develop the black bar part of the page,
        the black bar will show the name of the song, the spotify url to the song, and a like and dislike button of some sort
        the like button will add it to the current playlist, dislike will remove it from recommendations and not add it to current playlist
        */}
        <div style={{ width: "100%", height: "100px" }}></div>
      </Row>
    </Container>
  );
};

export default PlaylistPage;
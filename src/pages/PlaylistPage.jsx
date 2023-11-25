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
import { useEffect, useState } from "react";

const PlaylistPage = () => {
  const [accessToken, setAccessToken] = useState({});
  const [searchBox, setSearchBox] = useState("");
  const [playlist, setPlaylist] = useState([]);
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
    await fetch(
      "https://api.spotify.com/v1/search?q=" + inputtedSong + "&type=track",
      songParams
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

const handleInputChange = (event) => {
  setSearchBox(event.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();
  setPlaylist(prevList => [...prevList, searchBox]);
  setSearchBox('');
}

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
              <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}>
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
            <ListGroup className="fs-5">
              <ListGroup.Item action>List Group Item 1</ListGroup.Item>
              <ListGroup.Item action>List Group Item 2</ListGroup.Item>
              <ListGroup.Item action>List Group Item 3</ListGroup.Item>
            </ListGroup>
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
              <ListGroup.Item key={key} action>{song}</ListGroup.Item>
                
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistPage;

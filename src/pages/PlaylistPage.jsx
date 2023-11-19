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

const PlaylistPage = () => {
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
              />
              <Button variant="outline-secondary" id="button-addon2">
                Artist
              </Button>
              <Button variant="outline-secondary" id="button-addon2">
                Song
              </Button>
            </InputGroup>
          </Row>
        </Col>
        <Col>
          <div className="text-center " style={{ width: "80%", height: "500px" }}>
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
              <ListGroup.Item action>List Group Item 1</ListGroup.Item>
              <ListGroup.Item action>List Group Item 2</ListGroup.Item>
              <ListGroup.Item action>List Group Item 3</ListGroup.Item>
              <ListGroup.Item action>List Group Item 4</ListGroup.Item>
              <ListGroup.Item action>List Group Item 5</ListGroup.Item>
              <ListGroup.Item action>List Group Item 6</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
              <ListGroup.Item action>List Group Item 7</ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistPage;

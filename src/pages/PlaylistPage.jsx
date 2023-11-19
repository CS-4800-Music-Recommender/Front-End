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
        <div className="text-center" style={{ width: "15%" }}>
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
          <InputGroup className="mb-3" style={{ width: "25%" }}>
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
      </Row>
    </Container>
  );
};

export default PlaylistPage;

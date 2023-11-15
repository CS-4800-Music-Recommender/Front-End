import { Button, Col, Row, Container, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";
import lineart from "../images/splashscreen/line-art.png";
const Splashscreen = () => {
  return (
    <Container fluid className="p-5 text-center ">
      <Row>
        <Col>
          <Image src={logo} width={300} fluid />
        </Col>
        <Col>
          <Image src={lineart} width={300} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="inputtedSong">
              <Form.Control
                type="text"
                placeholder="Enter a song to build a playlist with"
                size="lg"
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              size="lg"
              className="my-3 p-3 fs-3"
            >
              {/* Might delete this button, just in case if we need a search song button*/}
              Search Song
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-success"
            size="lg"
            as={Link}
            to="/login"
            className="my-3 w-50 p-3 fs-1"
          >
            Login
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            size="lg"
            as={Link}
            to="/test"
            className="my-3 w-50 p-3 fs-1"
          >
            Import
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Splashscreen;

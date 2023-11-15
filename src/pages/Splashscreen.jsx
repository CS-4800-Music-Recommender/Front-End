import { Button, Col, Row, Container, Image, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";
import lineart from "../images/splashscreen/line-art.png";
const Splashscreen = () => {
  return (
    <Container fluid className="p-5  text-dark text-center ">
      <Row className="justify-content-between">
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
            <Form.Control type="text" placeholder="Enter a song to build a playlist with" size="lg"/>
          </Form.Group>
          <Button variant="success" type="submit" size="lg" className="my-3 p-3 fs-5">
            Create Playlist
          </Button>
        </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="dark" size="lg" as={Link} to="/test">
            {/* https://www.w3schools.com/bootstrap5/bootstrap_get_started.php */}
            Test Page
          </Button>
        </Col>
        <Col>
        
        </Col>
      </Row>

    </Container>
  );
};

export default Splashscreen;

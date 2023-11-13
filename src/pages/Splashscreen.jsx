import { Button, Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";
import lineart from "../images/splashscreen/line-art.png";
const Splashscreen = () => {
  return (
    <Container fluid className="p-5  text-dark text-center">
      <Row className="justify-content-between">
        <Col>
          <Image src={logo} fluid/>
        </Col>
        <Col>
          <Image src={lineart} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>This is the splashscreen</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="dark" size="lg" as={Link} to="/test">
            {/* https://www.w3schools.com/bootstrap5/bootstrap_get_started.php */}
            Test Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Splashscreen;

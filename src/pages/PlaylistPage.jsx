import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "../images/splashscreen/bpm-logo.png";

const PlaylistPage = () => {
  return (
    <Container fluid className="p-5 text-center ">
      <Row >
        <Col></Col>
        <Col>
          <Image src={logo} width={300} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistPage;

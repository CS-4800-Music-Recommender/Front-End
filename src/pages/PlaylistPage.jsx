import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "../images/splashscreen/bpm-logo.png";
import { List } from "react-bootstrap-icons";

const PlaylistPage = () => {
  return (
    <Container fluid className="p-5 text-center ">
      <Row>
        <Col>
          <List size={70}/>
        </Col>
        <Col xs={8}>
          <Image src={logo} width={300} fluid />
        </Col>
      </Row>
      <Row>
        
      </Row>
    </Container>
  );
};

export default PlaylistPage;

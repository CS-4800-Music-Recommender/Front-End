import { Button, Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";
import lineart from "../images/splashscreen/line-art.png";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
const Splashscreen = () => {
  return (
    <>
      {/* Row for 2 columns that have Logo and Search container, and Lineart container*/}
      <Row>
        <Col className="d-flex align-items-center justify-content-center my-5">
          <Container
            fluid
            className="text-center"
          >
            <Image
              src={logo}
              width={400}
              fluid
              style={{}}
            />
          </Container>
        </Col>
        {/* Lineart */}
        <Col>
          <Container fluid className="p-5 text-center">
            <Row>
              <Col>
                <Image src={lineart} width={300} fluid />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      {/* Container for login and Create buttons */}
      <Container fluid className="my-5 text-center ">
        <Row>
          <Col>
            <LoginButton />
            <LogoutButton />
          </Col>
          <Col>
            <Button
              style={{
                fontWeight: "bold",
                  borderRadius: "45px",
                  backgroundColor: "#72B550",
                  color: "#000",
                  borderWidth: "5px",
                  borderColor: "#000",
                  marginLeft: "128px",
              }}
              className="my-3 p-3 fs-1 w-50"
              size="lg"
              as={Link}
              to="/playlist"
            >
              Create
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Splashscreen;
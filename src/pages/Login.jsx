import { Button, Col, Container, Row, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";

const Login = () => {
  return (
    <>
      {/* Row for Logo Container */}
      <Row>
        <Container
          fluid
          className="p-5 text-center"
        >
          <Row>
            <Col>
              <Image
                src={logo}
                width={300}
                fluid
              />
            </Col>
          </Row>
        </Container>
      </Row>
      {/* Row for form and button container */}
      <Row>
        <Container
          fluid
          className="p-5 text-center"
        >
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 4, offset: 4 }}>
              <Form>
                <Form.Group
                  controlId="email"
                  className="mb-3"
                  style={{ border: "3px solid #000", borderRadius: "45px" }}
                >
                  <Form.Control
                    type="email"
                    placeholder="example@email.com"
                    size="lg"
                    style={{ border: "3px solid #000", borderRadius: "45px" }}
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group
                  controlId="password"
                  className="mb-3"
                  style={{ border: "3px solid #000", borderRadius: "45px" }}
                >
                  <Form.Control
                    type="password"
                    placeholder="password"
                    size="lg"
                    style={{ border: "3px solid #000", borderRadius: "45px" }}
                    className="text-center"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 4, offset: 2 }}>
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
                as={Link}
                to="/"
                className="my-3 p-3 fs-1 w-50"
              >
                Login
              </Button>
            </Col>
            <Col md={{ span: 4, offset: 0 }}>
              <Button
                style={{
                  fontWeight: "bold",
                  borderRadius: "45px",
                  backgroundColor: "#80e1ff",
                  color: "#000",
                  borderWidth: "5px",
                  borderColor: "#000",
                  marginRight: "128px",
                }}
                size="lg"
                as={Link}
                to="/register"
                className="my-3 p-3 fs-1 w-50"
              >
                Register
              </Button>
            </Col>
          </Row>
        </Container>
      </Row>
    </>
  );
};

export default Login;

import { Button, Col, Container, Row, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";

const Register = () => {
  return (
    <Container
      fluid
      className="p-5 text-center"
    >
      <Row>
        <Col>
          <Link to="/">
            <Image
              src={logo}
              width={300}
              fluid
            />
          </Link>
        </Col>
      </Row>
      <Row style={{ marginTop: "64px" }}>
        <Col md={{ span: 4, offset: 2 }}>
          <Form>
            <Form.Label
              style={{
                fontWeight: "bold",
                color: "#000",
                fontSize: "24px",
              }}
            >
              Enter Username
            </Form.Label>
            <Form.Group
              controlId="email"
              className="mb-3"
              style={{ border: "3px solid #000", borderRadius: "45px" }}
            >
              <Form.Control
                type="email"
                placeholder="Username"
                size="lg"
                style={{ border: "3px solid #000", borderRadius: "45px" }}
                className="text-center"
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Label
              style={{
                fontWeight: "bold",
                color: "#000",
                fontSize: "24px",
              }}
            >
              Type Password
            </Form.Label>
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
        <Col md={{ span: 4 }}>
          <Form>
            <Form.Label
              style={{
                fontWeight: "bold",
                color: "#000",
                fontSize: "24px",
              }}
            >
              Enter Email
            </Form.Label>
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
          </Form>
          <Form>
            <Form.Label
              style={{
                fontWeight: "bold",
                color: "#000",
                fontSize: "24px",
              }}
            >
              Re-Type Password
            </Form.Label>
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
        <Col>
          <Button
            style={{
              fontWeight: "bold",
              borderRadius: "45px",
              backgroundColor: "#72B550",
              color: "#000",
              borderWidth: "5px",
              borderColor: "#000",
              marginLeft: "64px",
            }}
            as={Link}
            to="/"
            className="my-3 p-3 fs-1 w-50"
          >
            Login
          </Button>
        </Col>
        <Col>
          <Button
            style={{
              fontWeight: "bold",
              borderRadius: "45px",
              backgroundColor: "#80e1ff",
              color: "#000",
              borderWidth: "5px",
              borderColor: "#000",
              marginRight: "",
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
  );
};

export default Register;

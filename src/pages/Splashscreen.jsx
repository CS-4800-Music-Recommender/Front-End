import { Button, Col, Row, Container, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";
import lineart from "../images/splashscreen/line-art.png";
const Splashscreen = () => {
  return (
    <>
      {/* Row for 2 columns that have Logo and Search container, and Lineart container*/}
      <Row>
        <Col>
          <Container
            fluid
            className="text-center"
          >
            <Row>
              <Col className="my-5">
                <Image
                  src={logo}
                  width={300}
                  fluid
                  style={{}}
                />
              </Col>
            </Row>
            {/* Search bar and buttons */}
            <Row>
              <Col
                md={{ span: 12, offset: 1 }}
                className="my-5"
              >
                <Form>
                  <Form.Group controlId="inputtedSong">
                    <Form.Control
                      type="text"
                      placeholder="Enter a song or an artist to build a playlist with"
                      size="lg"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="mx-5 d-flex">
                <Button
                  style={{
                    height: "50px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    borderRadius: "45px",
                    backgroundColor: "#dbdbdb",
                    color: "#72B550",
                    borderWidth: "5px",
                    borderColor: "#000",
                    justifyContent: "center",
                    marginRight: "5px",
                    marginLeft: "128px",
                  }}
                  type="submit"
                  className="p-3 fs-3"
                >
                  Search Song
                </Button>
                <Button
                  style={{
                    height: "50px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    borderRadius: "45px",
                    backgroundColor: "#dbdbdb",
                    color: "#72B550",
                    borderWidth: "5px",
                    borderColor: "#000",
                    justifyContent: "center",
                    marginLeft: "64px",
                  }}
                  type="submit"
                  className="p-3 fs-3"
                >
                  Search Artist
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
        {/* Lineart */}
        <Col>
          <Container
            fluid
            className="p-5 text-center"
          >
            <Row>
              <Col>
                <Image
                  src={lineart}
                  width={300}
                  fluid
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      {/* Container for login and register buttons */}
      <Container
        fluid
        className="my-5 text-center "
      >
        <Row>
          <Col>
            <Button
              style={{
                fontWeight: "bold",
                borderRadius: "45px",
                backgroundColor: "#dbdbdb",
                color: "#72B550",
                borderWidth: "5px",
                borderColor: "#000",
                marginLeft: "128px",
              }}
              as={Link}
              to="/login"
              className="w-50 p-3 fs-1"
            >
              Login
            </Button>
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
                marginRight: "128px",
              }}
              size="lg"
              as={Link}
              to="/test"
              className="p-3 fs-1 w-50"
            >
              Import
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Splashscreen;

import { Button, Col, Row, Container, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/splashscreen/bpm-logo.png";
import lineart from "../images/splashscreen/line-art.png";
import { useEffect, useState } from "react";
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
                placeholder="Enter a song or an artist to build a playlist with"
                size="lg"
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              size="lg"
              className="my-3 p-3 fs-3 mx-5"
            >
              Search Song
            </Button>
            <Button
              variant="success"
              type="submit"
              size="lg"
              className="my-3 p-3 fs-3 mx-5"
            >
              Search Artist
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
            className="my-3 p-3 fs-1 mx-5 w-50"
          >
            Login
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            size="lg"
            as={Link}
            to="/playlist"
            className="my-3 p-3 fs-1 mx-5 w-50"
          >
            Import
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Splashscreen;

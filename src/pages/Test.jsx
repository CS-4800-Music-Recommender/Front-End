import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import {useContext} from "react"
import { UserContext } from "../context/UserContext";
const Test = () => {
  const user = useContext(UserContext)
  console.log(user)
  return (
    <Container fluid className="p-5 text-center">
      <Col>
        <Row>
          <h1 className="text-center fs-2 my-5">
            This is a test screen that serves as a placeholder for any page not
            completed yet
          </h1>
        </Row>
      </Col>
      <Col>
        <p className="fs-1">Current user: {user.nickname}</p></Col>
      <Col>
        <Button
          variant="outline-success"
          size="lg"
          as={Link}
          to="/"
          className="my-3 w-50 p-3 fs-1"
        >
          Back to splashscreen/main page
        </Button>
      </Col>
    </Container>
  );
};

export default Test;

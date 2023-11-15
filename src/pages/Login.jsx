import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <Container fluid className="p-5 text-center">
        <Row>
            <Col>
                <h1 className="text-center fs-2 my-5">This is a placeholder login screen</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button
                    variant="outline-success"
                    size="lg"
                    as={Link}
                    to="/"
                    className="my-3 w-50 p-3 fs-1"
                >
                    Back to splashscreen
                </Button>
            </Col>
        </Row>
    </Container>
  )
}

export default Login
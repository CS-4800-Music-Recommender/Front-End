import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Splashscreen = () => {
  return (
    <div>
        <h1>This is the splashscreen</h1>
        <Button variant="primary" as={Link} to="/test">Test Page</Button>
    </div>
  )
}

export default Splashscreen
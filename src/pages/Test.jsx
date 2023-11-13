import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Test = () => {
  return (
    <div>
      <h1>This is test screen</h1>
      <Button variant="primary" as={Link} to="/">Main Page</Button>
    </div>
  );
};

export default Test;
